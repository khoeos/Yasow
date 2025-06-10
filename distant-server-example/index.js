const express = require('express');
const path = require('path');
const getPublicUrls = require('./getPublicUrls.js'); // Assurez-vous que le chemin est correct
const app = express();
const port = 8088;

app.set('trust proxy', true); // nécessaire pour que req.secure reflète correctement HTTPS

app.get('/', (req, res) => {
  res.send({content: 'Hello World!'});
});

const staticDir = path.join(__dirname, 'myFolder'); // adapter si nécessaire


app.use('/myFolder', express.static(staticDir));

app.get('/myFolder', async (req, res) => {
  try {
    const urls = await getPublicUrls(staticDir, `${req.protocol}://${req.get('host')}/myFolder`);
    res.send(urls);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




