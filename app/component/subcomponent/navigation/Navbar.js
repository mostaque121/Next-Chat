import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
export default function Navbar() {
    const { user } = useAuth();
    return (
        <nav className="text-white px-4 p-2 pt-3">
            <div className=" flex items-center justify-between">
                <Link href="/" className="text-2xl text-black font-bold">Chat</Link>
                <div className="flex items-center space-x-4">
                    <div className='relative rounded-full border-2 border-gray-400'>
                        <Image
                            src={user.photoURL}
                            alt='avatar'
                            width={40}
                            height={40}
                            priority
                            className='rounded-full'
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}


