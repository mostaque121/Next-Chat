import Image from "next/image";


const SearchConversationCard = () => {


    return (
        <div className=" p-2 hover:bg-gray-200 rounded-md cursor-pointer">
            <div>
                <div className="flex items-center w-full">
                    {/* User Avatar */}
                    <div className=" rounded-full">
                        <Image
                            className="rounded-full"
                            src="/avatar.avif"
                            alt="Avatar"
                            width={45}
                            height={45}
                        />
                    </div>

                    {/* Chat Content */}
                    <div className="ml-3 flex-1 ">
                        <div className="flex items-center justify-between w-full">
                            <h3 className="max-w-52 overflow-hidden text-ellipsis font-[500] text-nowrap">
                                Mostaque
                            </h3>
                        </div>

                        {/* Message Content or Typing Indicator */}
                        <div>
                            <div className="flex items-center max-w-60 gap-1">

                                <div className="flex gap-1 items-center">
                                    <p className="text-sm text-gray-700">You: Hey How Are You?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchConversationCard;
