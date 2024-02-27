// Assuming this component is `pages/note.tsx` for adding a new note
"use client";
import { useSession } from 'next-auth/react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, query, where, getDocs} from 'firebase/firestore';
import { firestore } from '@/lib//firebase';

export default function AddNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const { data: session, status } = useSession()


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

    const handleSubmit = async (e:any) => {
        e.preventDefault();



        const email = session?.user?.email;
        if (!email) {
          console.error("No email found in session");
          return;
        }

        const uid = await getUserUidByEmail(email);
        if (!uid) {
          console.error("No user found with this email");
          return;
        }

        try {
            await addDoc(collection(firestore, `users/${uid}/notes`), {
                title,
                content,
            });
            router.push('/dashboard');
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };

    return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                    <form onSubmit={handleSubmit} className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                        <h2 className="mb-4 text-3xl font-bold text-center text-purple-500">Add New Note</h2>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                name="content"
                                id="content"
                                required
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                            />
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                Save Note
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
}
