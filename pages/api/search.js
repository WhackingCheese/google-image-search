export default async function handler(req, res) {
  const q = req.query.q;
  const s = req.query.s;
  const start = parseInt(s);

  if (req.method !== 'GET' || q === undefined || s === undefined || isNaN(start) || start >= 100) {
    res.status(400).send('bad request');
    return;
  }

  const query = encodeURIComponent(q);

  const url = `https://content.googleapis.com/customsearch/v1?cx=001361074102112665899%3Ap7mybnrloug&q=${query}&start=${start}&searchType=image&key=${process.env.GOOGLE_API_KEY}`;

  let result;
  let data;
  
  try {
    result = await fetch(url);
    data = await result.json();
  } catch (err) {
    res.status(500).send('an error has occured');
    return;
  }

  res.status(result.status).json(data);
}
