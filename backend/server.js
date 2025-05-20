const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { parseStringPromise } = require('xml2js');

const app = express();
app.use(cors());

const GPC_BASE = 'https://welsh-dictionary.ac.uk';

app.get('/api/lookup', async (req, res) => {
  const { word, lang } = req.query;
  if (!word || !lang) return res.status(400).json({ error: 'Missing word or lang parameter' });

  // mode: 1 for Welsh, 2 for English
  const mode = lang.toLowerCase() === 'english' ? 2 : 1;

  try {
    // 1. Search for matches
    const searchUrl = `${GPC_BASE}/gpc/servlet?func=search&str=${encodeURIComponent(
      word
    )}&first=0&max=20&mode=${mode}&user=JS-800509a27d53b2ebd993033281540897`;

    const searchResp = await axios.get(searchUrl);
    const searchXml = await parseStringPromise(searchResp.data);

    // 2. Extract the first matchId from response
    // XML structure: <matches><match><matchId>12345</matchId></match>...</matches>
    const matches = searchXml.matches?.match;
    if (!matches || matches.length === 0) {
      return res.status(404).json({ error: 'No match found' });
    }
    const matchId = matches[0].matchId?.[0];
    if (!matchId) {
      return res.status(404).json({ error: 'No matchId found' });
    }

    // 3. Get full entry by matchId
    const entryUrl = `${GPC_BASE}/gpc/servlet?func=entry&id=${matchId}&user=JS-800509a27d53b2ebd993033281540897`;
    const entryResp = await axios.get(entryUrl);
    const entryXml = await parseStringPromise(entryResp.data);

    // 4. Return the entry JSON
    res.json({
      matchId,
      entry: entryXml,
    });
  } catch (error) {
    console.error('Lookup error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
