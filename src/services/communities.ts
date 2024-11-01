import { 
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Community } from '../types/community';

export async function createCommunity(data: Partial<Community>) {
  const docRef = await addDoc(collection(db, 'communities'), {
    ...data,
    createdAt: new Date()
  });

  return { id: docRef.id, ...data };
}

export async function listCommunities(userId: string) {
  const q = query(
    collection(db, 'communities'),
    where('members', 'array-contains', userId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addOrganizer(communityId: string, userId: string) {
  const communityRef = doc(db, 'communities', communityId);
  await updateDoc(communityRef, {
    organizers: arrayUnion(userId)
  });
}

export async function addMember(communityId: string, userId: string) {
  const communityRef = doc(db, 'communities', communityId);
  await updateDoc(communityRef, {
    members: arrayUnion(userId)
  });
}