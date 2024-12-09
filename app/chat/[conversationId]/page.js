import Header from "@/app/component/subcomponent/Conversation/Header";
export default async function Page({ params, toggleNavigation }) {
    const { conversationId } = await params;
    return (
        <div>
            <Header />
            Chat Page {conversationId}
        </div>
    )
}