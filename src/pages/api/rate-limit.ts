
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

const RATE_LIMIT = 3;
const PERIOD = 60 * 60 * 1000; 
// const PERIOD = 15 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId } = req.body;
    const now = Date.now();

    try {
      const [lastRequestTime, requestCount] = await Promise.all([
        kv.get(`rate-limit:${userId}:time`),
        kv.get(`rate-limit:${userId}:count`)
      ]);

      const lastRequestTimeNumber = parseInt(lastRequestTime as string || '0', 10);
      const requestCountNumber = parseInt(requestCount as string || '0', 10);

      if (now - lastRequestTimeNumber > PERIOD) {
        await Promise.all([
          kv.set(`rate-limit:${userId}:time`, now.toString()),
          kv.set(`rate-limit:${userId}:count`, '1')
        ]);
        res.status(200).json({ allowed: true });
      } else if (requestCountNumber < RATE_LIMIT) {
        await kv.incr(`rate-limit:${userId}:count`);
        res.status(200).json({ allowed: true });
      } else {
        res.status(429).json({ error: 'Rate limit exceeded' });
      }
    } catch (error) {
      console.error('Rate limit check error:', error);
      res.status(500).json({ error: 'Rate limit check failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
