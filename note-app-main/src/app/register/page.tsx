import { SignUpWithEmail } from "../../lib/auth";
import Link from 'next/link';

export default function SignUp() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-6xl font-bold text-gray-800">
                    <span className="text-purple-500">SD</span>
                </h1>
                <h2 className="mt-4 text-center text-2xl font-semibold text-gray-700">
                    Creeaza cont
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <SignUpWithEmail />
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>

                        </div>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Conecteaza-te{' '}
                    <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
