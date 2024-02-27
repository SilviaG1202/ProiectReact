import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import NoteForm from '@/components/NoteForm';

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
  
  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default async function NewNoteView() {
    const sessionNEXTAUTH = await getServerSession();
    if (!sessionNEXTAUTH) {
      redirect('/login');
    }
  
    return (
      <>
        <div className="bg-gray-100">
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          </div>
  
          <main className="py-10 lg:pl-72">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-6">
                <div className="text-lg font-semibold leading-6 text-gray-900">Add Note</div>
              </div>
  
              <NoteForm/>
              </div>
          </main>
  
          </div>
  
      </>
    )
  }
  