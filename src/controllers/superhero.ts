export const scoreController = async (req, res, _next) => {
  const { superheroScore } = req.body;
  if (typeof superheroScore !== 'number') {
    res.status(400).json({ error: 'INVALID INPUT' });
    return;
  }
  if (superheroScore < 0 || superheroScore > 100) {
    res.status(400).json({ error: 'INVALID INPUT' });
    return;
  }
  res.json({ msg: 'SUCCESS' });
};
