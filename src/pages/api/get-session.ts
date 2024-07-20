// src/pages/api/get-session.ts
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      if (typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid userId' });
      }

      console.log('Attempting to retrieve session for userId:', userId);

      const sessionKey = `session:${userId}`;
      const sessionData = await kv.get(sessionKey);
      console.log('Retrieved session data:', sessionData, 'Type:', typeof sessionData);

      if (sessionData === null || sessionData === undefined) {
        return res.status(404).json({ error: 'Session data not found' });
      } else if (typeof sessionData === 'string') {
        try {
          const parsedData = JSON.parse(sessionData);
          return res.status(200).json(parsedData);
        } catch (parseError) {
          console.error('Error parsing session data:', parseError);
          return res.status(500).json({ error: 'Invalid session data format' });
        }
      } else if (typeof sessionData === 'object') {
        // If the data is already an object, return it directly
        return res.status(200).json(sessionData);
      } else {
        console.log('Unexpected session data type:', typeof sessionData, 'Value:', sessionData);
        return res.status(500).json({ error: 'Unexpected session data format', dataType: typeof sessionData });
      }
    } catch (error: any) {
      console.error('Error retrieving session data:', error);
      res.status(500).json({ error: 'Failed to retrieve session data', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}