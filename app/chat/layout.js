'use client'
import { useAuth } from "@/context/AuthContext";
import Navigation from "../component/Navigation";
export default function RootLayout({ children }) {
    const { toggleNavigation, isNavigationVisible } = useAuth();
    return (
        <div>
            <div className="flex">
                <div className={`${isNavigationVisible ? 'block' : 'hidden'} lg:block w-full lg:max-w-[450px]`}>
                    <Navigation />
                </div>
                <div className={`${isNavigationVisible ? 'hidden' : 'block'} lg:block flex-1`}>
                    {children}
                </div>
            </div>

        </div>

    );
}
