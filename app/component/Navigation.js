'use client'
import { useState } from "react";
import AllConversation from "./subcomponent/navigation/AllConversation";
import Navbar from "./subcomponent/navigation/Navbar";
import Searchbar from "./subcomponent/navigation/Searchbar";
import SearchResult from "./subcomponent/navigation/SearchResult";

export default function Navigation() {
    const [focused, setFocused] = useState(false);
    const [querry, setQuerry] = useState('');
    return (
        <div className="h-screen w-full border-r-[1.5px] border-gray-200">
            <div className="flex flex-col h-full">
                <Navbar />
                <Searchbar focused={focused} setFocused={setFocused} querry={querry} setQuerry={setQuerry} />
                {(querry) ? <div className="flex-1 custom-scrollbar mt-1 hover:overflow-y-auto ">
                    <SearchResult />
                </div> :
                    <div className="flex-1 mt-1 custom-scrollbar transition-all duration-200"><AllConversation /></div>
                }
            </div>
        </div>
    )
}