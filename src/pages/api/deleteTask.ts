import { db } from '@/lib/firebase/firebase-admin';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  type ReqBody = {
    fieldValue: string;
  };

  const { fieldValue } = req.body as ReqBody;

  if (!fieldValue) {
    res
      .status(400)
      .json({ message: 'Bad Request: Missing collectionName, fieldName, or fieldValue' });
    return;
  }

  try {
    const snapshot = await db.collection('data').where('id', '==', fieldValue).get();

    if (snapshot.empty) {
      res.status(404).json({ message: 'No matching documents found' });
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    res.status(200).json({ message: 'Document(s) deleted successfully' });
  } catch (error) {
    console.error('削除中にエラーが発生しました。再度削除操作を実行してください。');
  }
}
