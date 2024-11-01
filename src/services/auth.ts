import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'ORGANIZER' | 'PLAYER';
}

export async function signIn({ email, password }: SignInCredentials): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const { user } = result;

  // Get additional user data from Firestore
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  const userData = userDoc.data();

  return {
    id: user.uid,
    name: userData?.name || '',
    email: user.email || '',
    role: userData?.role || 'PLAYER'
  };
}

export async function signUp(data: { 
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'ORGANIZER' | 'PLAYER';
}): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

  // Create user document in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    name: data.name,
    email: data.email,
    role: data.role || 'PLAYER',
    createdAt: new Date()
  });

  return {
    id: user.uid,
    name: data.name,
    email: data.email,
    role: data.role || 'PLAYER'
  };
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
  localStorage.removeItem('@dominoclub:user');
}