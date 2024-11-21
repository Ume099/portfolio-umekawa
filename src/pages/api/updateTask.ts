import { db } from '@/lib/firebase/firebase-admin';

import type { NextApiRequest, NextApiResponse } from 'next';

type ReqBody = { id: number; completed: boolean };

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, completed } = req.body as ReqBody;

  // 必須フィールドのチェック
  if (id === undefined) {
    return res.status(400).json({ message: 'Bad Request: Missing required fields' });
  }

  try {
    const snapshot = await db.collection('data').where('id', '==', id).get();

    if (snapshot.empty) {
      res.status(404).json({ message: 'No matching documents found' });
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { completed: completed });
    });

    await batch.commit();

    res.status(200).json({ message: 'Document(s) deleted successfully' });

    return res.status(201).json({ message: 'Document created successfully' });
  } catch (error) {
    console.error('Error adding document:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default handler;
