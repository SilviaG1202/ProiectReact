import { PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

export default function NewNote() {
    return (
      <div className='flex-items-center lg:block'>
        <div className="flex-shrink-0">
          <Link href="/note/new">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              New Note
            </button>
          </Link>
        </div>
      </div>
    )
}