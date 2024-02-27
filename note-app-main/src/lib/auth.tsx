"use client";

import React, { Fragment, useEffect, useState } from 'react';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { firestore, auth, signInWithGooglePopup, signUpWithEmail as signUpWithEmailFirebase, signInWithEmail as signInWithEmailFirebase } from '@/lib/firebase';
import { doc, setDoc } from "firebase/firestore";

export function SignUpWithEmail() {
  const router = useRouter();

  const [email, setEmail]                                   = useState('');
  const [isEmailValid, setIsEmailValid]                     = useState(true);
  const [password, setPassword]                             = useState('');
  const [isPasswordValid, setIsPasswordValid]               = useState(true);
  const [confirmPassword, setConfirmPassword]               = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const signUpWithEmail = async (event: { preventDefault: () => void; }) => 
  {
    event.preventDefault();
    if (isFormValid()) 
    {
      try 
      {
        const userCredential = await signUpWithEmailFirebase(email, password);
        const user = userCredential.user;

        await setDoc(doc(firestore, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          active: true,
        });

        signIn('credentials', {email, password, redirect: true, callbackUrl: '/dashboard'})

      } 
      catch (error) 
      {
        if (error instanceof Error) 
        {
          console.error('Error signing up:', error.message);
        } 
        else 
        {
          console.error('An unknown error occurred:', error);
        }
      }
    }
  };

  const validateEmail = (email:string) => 
  {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password: string) => 
  {
    const minLength = 5;
    const maxLength = 30;
    const hasDigit = /\d/.test(password);
    return password.length >= minLength && password.length <= maxLength && hasDigit;
  };
  
  const isFormValid = () => 
  {
    return  isEmailValid && isPasswordValid && isConfirmPasswordValid && password === confirmPassword;
  };

  return (
    <>
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>

          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setIsEmailValid(validateEmail(e.target.value));
                setEmail(e.target.value);
              }
              }
              className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                isEmailValid ? 'ring-gray-300 placeholder:text-gray-400' : 'ring-red-300 text-red-900 placeholder:text-red-300'
              } focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6`}
            />

              {
              !isEmailValid && 
                (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    email invalid
                  </div>
                )
              }
            </div>
          </div>
  
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                // autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setPassword(newPassword)
                  setIsPasswordValid(validatePassword(newPassword));
                  setIsConfirmPasswordValid(newPassword === confirmPassword);
                }
              }
                className="block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
              />

              {
              !isPasswordValid && 
                (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    parola trebuie sa contina cel putin 5 caractere si un numar
                  </div>
                )
              }
            </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Confirm Password
          </label>

            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  const newConfirmPassword = e.target.value;
                  setConfirmPassword(newConfirmPassword);
                  setConfirmPassword(newConfirmPassword);
                  setIsConfirmPasswordValid(password === newConfirmPassword);
                }
                }
                className="block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
              />

              {
              !isConfirmPasswordValid && 
                (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    parolele nu corespund
                  </div>
                )
              }
            </div>
          </div>

  
          <div>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:amber-indigo-600 ${isFormValid()? 'hover:bg-amber-700' : ''}`}
              onClick={signUpWithEmail}
            >
              Sign Up
            </button>
          </div>
                  
          </form>
    </>
  );
};

//----------------------------------------------------------------------------
export function SignInWithEmail() {
  const router = useRouter();

  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [authError, setAuthError]       = useState('');

  const logInWithEmail = async (event: { preventDefault: () => void; }) => 
  {
    event.preventDefault();
    if (isFormValid()) 
    {
      try 
      {
        signIn('credentials', {email, password, redirect: true, callbackUrl: '/dashboard'})
      } 
      catch (error) 
      {
        if (error instanceof Error) 
        {
          console.error('Error signing up:', error.message);
        } 
        else 
        {
          console.error('An unknown error occurred:', error);
        }
      }
    }
  };

  const validateEmail = (email:string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid = () => {
    return  isEmailValid;
  };

  const searchParams = useSearchParams();

  useEffect(() => 
  {
    if (searchParams) 
    {
      const errorParam = searchParams.get('error');
      if (errorParam === 'CredentialsSignin') 
      {
        setAuthError('Wrong Login Info');
      }
    }
  }, [searchParams]);

  return (
    <>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value = {email}
              onChange={(e) => {
                setIsEmailValid(validateEmail(e.target.value));
                setEmail(e.target.value)
              }
            }
              className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-purple-300 ${
                isEmailValid ? 'ring-purple-300 placeholder:text-gray-400' : 'ring-red-300 text-red-900 placeholder:text-red-300'
              } focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6`}            
              />

              {!isEmailValid && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  Not a valid email address.
                </div>
              )}
            </div>
          </div>
  
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
             <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                />
              </div>
                </div>
  
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-gray-600 hover:text-amber-500">
                      Forgot password?
                    </a>
                  </div>
                </div> */}



          <div>  
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:amber-indigo-600 ${isFormValid()? 'hover:bg-amber-700' : ''}`}              
              onClick={logInWithEmail}
            >
              Sign In
            </button>
          </div>


          {authError && (
            <div className="flex items-center mt-2 text-sm text-red-600">
              {authError}
            </div>
          )}
      </form>
    </>
  );
}