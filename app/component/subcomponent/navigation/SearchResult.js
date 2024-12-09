import { useState } from "react"
import SearchCommunityCard from "../../card/SearchCommunityCard"
import SearchConversationCard from "../../card/SearchConversationCard"
SearchConversationCard
export default function SearchResult() {
    const [selectedResult, setSelectedResult] = useState('conversation')
    return (
        <div>
            <div className="flex mx-8 py-2 gap-3 font-[500]">
                <button
                    className={`bg-gray-200 px-3 pt-1 pb-1.5 rounded-full ${selectedResult === 'conversation' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-black'}`}
                    onClick={() => setSelectedResult('conversation')}
                >
                    Conversation
                </button>
                <button
                    className={`bg-gray-200 px-3 pt-1 pb-1.5 rounded-full ${selectedResult === 'community' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-black'}`}
                    onClick={() => setSelectedResult('community')}
                >
                    Community
                </button>
            </div>

            <div className="px-4">
                {
                    selectedResult === 'conversation' ?
                        <>
                            <SearchConversationCard />
                            <SearchConversationCard />
                            <SearchConversationCard />
                            <SearchConversationCard />
                            <SearchConversationCard />
                        </>
                        :
                        <>
                            <SearchCommunityCard />
                            <SearchCommunityCard />
                            <SearchCommunityCard />
                            <SearchCommunityCard />
                            <SearchCommunityCard /></>
                }

            </div>
        </div >
    )
}


