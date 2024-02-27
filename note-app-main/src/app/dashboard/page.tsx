import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { firestore, auth } from '@/lib//firebase';
import { doc, collection, getDocs } from 'firebase/firestore';

import NewNote from '@/components/NewNote';
import NoteCardsUI from '@/components/NoteCardsUI';
import NoteCards from '@/components/NoteCards';

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

export default async function allnotesView() {

  const sessionNEXTAUTH = await getServerSession();
  // protectie ruta privata next auth
  
  // if (!sessionNEXTAUTH) {
  //   redirect('/login');
  // }

  const notes = await getDocs(collection(firestore, "notes"));


  return (
    <div className="bg-gray-50 h-full">
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold leading-6 text-gray-900">
              notes
            </div>
              <div className="hidden lg:block ml-auto">
                <NewNote />
              </div>
          </div>

            <NoteCards /> 

         </div>
      </main>

    </div>
    
  )
}