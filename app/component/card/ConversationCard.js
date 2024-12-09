import Image from "next/image";
import {
    IoIosCheckmarkCircle,
    IoIosCheckmarkCircleOutline,
    IoIosRadioButtonOff,
    IoMdAlert,
} from "react-icons/io";


const ConversationCard = () => {

    const lastMessage = {};
    const isTyping = false;

    let Icon;
    switch (lastMessage.status) {
        case "sending":
            Icon = IoIosRadioButtonOff;
            break;
        case "sent":
            Icon = IoIosCheckmarkCircleOutline;
            break;
        case "seen":
            Icon = IoIosCheckmarkCircle;
            break;
        case "failed":
            Icon = IoMdAlert;
            break;
        default:
            Icon = null;
            break;
    }



    return (
        <div className=" cursor-pointer hover:bg-gray-200 active:bg-blue-500  p-3 rounded-md">
            <div>
                <div className="flex w-full">
                    {/* User Avatar */}
                    <div className=" rounded-full">
                        <Image
                            className="rounded-full"
                            src="/avatar.avif"
                            alt="Avatar"
                            width={55}
                            height={55}
                            priority
                        />
                    </div>

                    {/* Chat Content */}
                    <div className="ml-3 flex-1">
                        {/* Username and Timestamp */}
                        <div className="flex items-center mt-1 justify-between w-full">
                            <h3 className="max-w-52 font-[500] overflow-hidden text-[16px] text-ellipsis text-nowrap">
                                Mostaque
                            </h3>
                            <p className="text-xs">
                                12PM
                            </p>
                        </div>

                        {/* Message Content or Typing Indicator */}
                        <div className="mt-1">
                            <div className="flex items-center max-w-60 gap-1">
                                {isTyping ? (
                                    <div className="typing-indicator-small h-5">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex gap-1 items-center">
                                            <p>{Icon ? <Icon /> : null}</p>
                                            <p className="text-sm">You: </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationCard;
