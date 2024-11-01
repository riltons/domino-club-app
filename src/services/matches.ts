import { 
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { GameMatch } from '../types/game';

export async function createMatch(data: Partial<GameMatch>) {
  const docRef = await addDoc(collection(db, 'matches'), {
    ...data,
    startTime: new Date(),
    status: 'IN_PROGRESS'
  });

  return { id: docRef.id, ...data };
}

export async function updateMatch(id: string, data: Partial<GameMatch>) {
  const matchRef = doc(db, 'matches', id);
  await updateDoc(matchRef, data);
}

export async function finishMatch(id: string, data: {
  winningTeam: 'team1' | 'team2';
  victoryType: string;
  remainingTiles?: {
    team1: number;
    team2: number;
  };
}) {
  const matchRef = doc(db, 'matches', id);
  await updateDoc(matchRef, {
    ...data,
    status: 'FINISHED',
    endTime: new Date()
  });
}

export async function listMatches(filters?: {
  communityId?: string;
  status?: 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED';
}) {
  let q = collection(db, 'matches');

  if (filters?.communityId) {
    q = query(q, where('communityId', '==', filters.communityId));
  }

  if (filters?.status) {
    q = query(q, where('status', '==', filters.status));
  }

  q = query(q, orderBy('startTime', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}