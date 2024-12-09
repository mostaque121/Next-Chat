'use client'
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { FaEllipsisV, FaPhone, FaVideo } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
const Header = () => {
    const { toggleNavigation } = useAuth();
    return (
        <div>
            <header className="bg-white shadow-md px-4 py-2">
                <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-3">
                        <button onClick={toggleNavigation} className="p-2 lg:hidden rounded-full hover:bg-gray-200 transition-colors">
                            <FaArrowLeftLong className="text-gray-600 text-lg" />
                        </button>
                        <div className="w-10 relative h-10 rounded-full bg-gray-300 overflow-hidden">
                            <Image
                                src="/avatar.avif"
                                alt="Profile"
                                fill
                                priority
                                className=" object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">John Doe</h1>
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                Active now • 5 min ago
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <FaPhone className="text-gray-600 text-lg" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <FaVideo className="text-gray-600 text-lg" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <FaEllipsisV className="text-gray-600 text-lg" />
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;