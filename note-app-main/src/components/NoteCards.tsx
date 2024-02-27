import { getServerSession } from 'next-auth';
import { firestore } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import NoteCardsUI from '@/components/NoteCardsUI';

const getUserUidByEmail = async (email: string) => {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
  
    try {
      const querySnapshot = await getDocs(q);
      let uid = null;
      querySnapshot.forEach((doc) => {
        uid = doc.id; // or doc.data().uid if uid is within the document data
      });
      return uid;
    } catch (error) {
      console.error("Error fetching user by email: ", error);
      return null;
    }
  };

interface Note
{
  id: string;
  content: string;
  title: string;
}

interface NoteCardsProps 
{
    userID: string;
}


async function fetchNotes(): Promise<Note[]> 
{
    const sessionNEXTAUTH = await getServerSession();
    console.log("SESSION", sessionNEXTAUTH);

    if (!sessionNEXTAUTH) {
        throw new Error("Error fetching notes: User not found: Cannot retrieve email.");
    }
    const email = sessionNEXTAUTH?.user?.email;
    if (!email) {
        throw new Error("Error fetching notes: User not found: Cannot read email.");
    }

    const userID = await getUserUidByEmail(email);
    const notesCollection = collection(firestore, `users/${userID}/notes`);
    const q = query(notesCollection, where("content", "!=", ""));
    const querySnapshot = await getDocs(q);
    const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Note);

    return notes;
}


export default async function NoteCards()
{
    const notes = await fetchNotes();
    return <NoteCardsUI notes={notes} />;
}