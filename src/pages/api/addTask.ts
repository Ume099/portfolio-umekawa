import { db } from '@/lib/firebase/firebase-admin';
import { COLLECTION_NAME_DATA, Task } from '@/lib/types/tasks';

import type { NextApiRequest, NextApiResponse } from 'next';

type ExtendedArea = Record<string, unknown>; // 動的プロパティ用の型
type ReqBody = Task & ExtendedArea;

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { label, completed, isDeleted, id, ...extendedArea } = req.body as ReqBody;

  // 必須フィールドのチェック
  if (!label || completed === undefined || isDeleted === undefined) {
    return res.status(400).json({ message: 'Bad Request: Missing required fields' });
  }

  try {
    const collectionRef = db.collection(COLLECTION_NAME_DATA);
    const docRef = collectionRef.doc();

    await docRef.set({ label, completed, isDeleted, id, ...extendedArea });

    return res.status(201).json({ message: 'Document created successfully', docId: docRef.id });
  } catch (error) {
    console.error('Error adding document:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default handler;
