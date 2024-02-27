"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

interface Note
{
    id: string;
    content: string;
    title: string;
}

interface NoteCardsUIProps 
{
    notes: Note[];
}

function NoteCardsUI({ notes }: NoteCardsUIProps) {

    return (
        <>
        
        {/* <div>
            {subscriptions.map((subscription: Subscription) => (
                <div key={subscription.id}>
                    <h1>{subscription.name}</h1>
                    <p>{subscription.price}</p>
                </div>
            ))}
        </div> */}

        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
            {
                notes.map((note: Note) => (
                    <li key={note.id} className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-100 p-6">

                            <div className="text-sm font-medium leading-6 text-gray-900">{note.title}</div>
                            <p>{note.content}</p>

                        </div>


                    </li>
                    ))
            }
        </ul>
        </>
    );
}

export default NoteCardsUI;