
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default function Searchbar({ focused, setFocused, querry, setQuerry }) {


    return (
        <div className="mt-3">
            <div className={`flex items-center mx-8 h-9 rounded-full overflow-hidden transition-all duration-200 ring-blue-500 ${(focused || querry) ? 'ring-blue-500 ring-2' : 'ring-1 ring-gray-400'} `}>
                <IoSearchOutline className={`w-10 h-10 ml-1 p-2 ${(focused || querry) ? 'text-blue-500' : 'text-gray-400'}`} />
                <input
                    value={querry}
                    onChange={(e) => setQuerry(e.target.value)}
                    className="w-full outline-none bg-transparent border-none"
                    type='text'
                    placeholder="Search"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}>
                </input>
                {(querry || focused) &&
                    <RxCross2
                        className='w-7 rounded-full shrink-0 p-1 transition-all duration-200 h-7  mr-1 hover:bg-gray-100 cursor-pointer'
                        onClick={() => setQuerry('')}
                    />
                }

            </div>

        </div>
    )
}


