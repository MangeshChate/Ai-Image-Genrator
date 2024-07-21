
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId, imageId } = req.body;

    try {
      await kv.rpush(`user:${userId}:history`, imageId);
      res.status(200).json({ message: 'History saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save history' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
