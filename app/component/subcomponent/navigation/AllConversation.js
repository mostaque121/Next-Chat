import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ConversationCard from "../../card/ConversationCard";
const AllConversation = () => {
    const { toggleNavigation } = useAuth();
    return (
        <div className=" p-2 px-5  rounded-md cursor-pointer">
            {[...Array(10)].map((_, i) => (
                <Link key={i + 1} href={`/chat/${i + 1}`} onClick={toggleNavigation} >
                    <ConversationCard />
                </Link>
            ))}
        </div>
    );
};

export default AllConversation;
