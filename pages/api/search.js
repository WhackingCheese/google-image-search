import dat from './dat.json';

export default async function handler(req, res) {
  const q = req.query.q;

  if (req.method !== 'GET' || q === undefined) {
    res.status(400).send('bad request');
    return;
  }

  const query = encodeURIComponent(q);

  const url = `https://content.googleapis.com/customsearch/v1?cx=001361074102112665899%3Ap7mybnrloug&q=${query}&searchType=image&key=${process.env.GOOGLE_API_KEY}`;

  //const result = await fetch(url);
  //const data = await result.json();

  res.status(200).json(dat);
}
