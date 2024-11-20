import { db } from '@/lib/firebase/firebase-admin';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { collectionName } = req.query;

  if (typeof collectionName !== 'string') {
    res.status(400).json({ message: 'collectionName is missing or invalid' });
    return;
  }

  try {
    // コレクション全体を取得
    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      res.status(404).json({ message: 'No documents found in the collection' });
      return;
    }

    // 各ドキュメントのデータを取得
    const documents = snapshot.docs.map((doc) => ({
      id: doc.id, // ドキュメントIDを含める場合
      ...doc.data(), // ドキュメントのデータ
    }));

    res.status(200).json(documents);
  } catch (error) {
    console.error('コレクションの取得に失敗しました。:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
