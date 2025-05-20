const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { parseStringPromise } = require('xml2js');

const app = express();
app.use(cors());

const GPC_BASE = 'https://welsh-dictionary.ac.uk';

app.get('/api/lookup', async (req, res) => {
  const { word, lang } = req.query;
  const mode = lang === 'english' ? 2 : 1;

  try {
    // 1. Search for matchId
    const searchUrl = `${GPC_BASE}/gpc/servlet?func=search&str=${encodeURIComponent(word)}&first=0&max=20&mode=${mode}&user=JS-800509a27d53b2ebd993033281540897`;

    const searchResp = await axios.get(searchUrl);
    const searchXml = await parseStringPromise(searchResp.data);
    const matchId = searchXml?.matches?.match?.[0]?.matchId?.[0];

    if (!matchId) {
      return res.status(404).json({ error: 'No match found' });
    }

    // 2. Fetch full entry
    const entryUrl = `${GPC_BASE}/gpc/servlet?func=entry&id=${matchId}&user=JS-800509a27d53b2ebd993033281540897`;
    const entryResp = await axios.get(entryUrl);
    const entryXml = await parseStringPromise(entryResp.data);

    res.json({
      matchId,
      entry: entryXml,
    });
  } catch (error) {
    console.error('Lookup error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// 🟢 Use Render's provided PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
