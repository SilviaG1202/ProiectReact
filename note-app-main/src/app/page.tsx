// homepage - ruta publica

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">
        Silvia's Diary
      </h1>
      <p className="mt-3 text-2xl text-purple-500">
        Your personal note-taking app.
      </p>
      <div className="mt-6">
        <Link 
          href="/login" 
          className="mx-4 px-4 py-2 text-sm font-semibold text-gray-700 bg-white rounded-md shadow hover:bg-gray-100"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="mx-4 px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-md shadow hover:bg-purple-600"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
