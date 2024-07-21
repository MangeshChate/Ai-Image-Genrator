
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const history = await kv.lrange(`user:${userId}:history`, 0, -1);
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch history' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
