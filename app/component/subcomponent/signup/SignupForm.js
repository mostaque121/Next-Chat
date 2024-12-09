'use client'

import { auth, database } from "@/config/firebaseConfig"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { ref, set } from "firebase/database"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaEnvelope } from "react-icons/fa"
import LoadingButton from "../Button/LoadingButton"
import AvatarSelector from './AvatarSelector'

export default function SignUpForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('https://res.cloudinary.com/dn07zqh1o/image/upload/v1733720802/ca14_ddfiba.svg')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [created, setCreated] = useState(true);
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            // Simulate API call and Firebase upload
            await new Promise(resolve => setTimeout(resolve, 2000))

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);

            // Update user profile with name and avatar (Firebase Auth)
            await updateProfile(user, { displayName: name, photoURL: avatar });

            // Save user data to Firebase Realtime Database
            await set(ref(database, `users/${user.uid}`), {
                name,
                email,
                avatar,
                "online": false,
                lastActive: Date.now(),
            });

            router.push('/signin')
        } catch (err) {
            setError('Failed to register. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="border-r-[1.5px] border-gray-200 h-screen overflow-y-auto custom-scrollbar  p-4">
            {created ?
                (
                    <div className="flex w-full h-full items-center justify-center">
                        <div className="w-full max-w-md mx-auto bg-white shadow-md border border-gray-200 rounded-md">
                            {/* Card Header */}
                            <div className="p-4">
                                <h2 className="text-2xl font-bold text-center">Account Created!</h2>
                                <p className="text-sm text-gray-500 text-center">
                                    We're excited to have you on board.
                                </p>
                            </div>
                            {/* Card Content */}
                            <div className="p-4 space-y-4">
                                {/* Icon */}
                                <div className="flex items-center justify-center">
                                    <FaEnvelope className="w-12 h-12 text-blue-500" />
                                </div>
                                {/* Description */}
                                <p className="text-center">
                                    Your account has been successfully created. A verification link has
                                    been sent to your email address. Please check your inbox and confirm
                                    your email to activate your account.
                                </p>
                                {/* Resend Link */}
                                <div className="text-center text-sm text-gray-500">
                                    Didn't receive the email? Check your spam folder or{" "}
                                    <button className="text-blue-500 hover:underline p-0 h-auto font-normal bg-transparent border-none">
                                        request a new verification link
                                    </button>
                                </div>
                                {/* Continue Button */}
                                <button className="w-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md font-medium">
                                    <Link href="/signin">Continue to Login</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className="w-full space-y-8 bg-white p-8">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Or{' '}
                                <Link href="/login" className="font-medium text-blue-500 hover:text-blue-500">
                                    sign in to your existing account
                                </Link>
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <AvatarSelector onAvatarChange={setAvatar} />
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <label htmlFor="name" className="sr-only">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center" role="alert">
                                    {error}
                                </div>
                            )}

                            <div>
                                <LoadingButton isLoading={isLoading} defaultText={'Sign up'} loadingText={'Signing up...'} className='text-sm w-full py-2 px-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50' />
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div>
                                    <a
                                        href="#"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                        </svg>
                                        Google
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                                        </svg>
                                        Facebook
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>)
            }

        </div>
    )
}
