
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId, sessionData } = req.body;

    try {
      await kv.set(`session:${userId}`, JSON.stringify(sessionData));
      res.status(200).json({ message: 'Session data stored successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to store session data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
