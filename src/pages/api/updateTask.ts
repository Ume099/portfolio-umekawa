import { db } from '@/lib/firebase/firebase-admin';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  type ReqBody = {
    id: number;
    fieldName: string;
    fieldValue: string;
  };

  const { id, fieldName, fieldValue } = req.body as ReqBody;

  if (!id || !fieldName) {
    console.log('testtstst');

    console.log(id);
    console.log(fieldName);
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  try {
    const querySnapshot = await db.collection('data').where('id', '==', id).limit(1).get();

    let docRef;
    if (!querySnapshot.empty) {
      docRef = querySnapshot.docs[0].ref;
    }

    if (!docRef) {
      return res.status(500).json({ success: false, message: 'Failed to update document' });
    }

    await docRef.update({
      [fieldName]: fieldValue,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update document' });
  }
}
