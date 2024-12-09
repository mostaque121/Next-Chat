'use client'
import { useAuth } from "@/context/AuthContext";

const Home = () => {
    const { user } = useAuth(); // Access current user
    const { logout } = useAuth();

    if (!user) {
        return <div>Please log in to access this page</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.displayName}</h1>
            <img src={user.photoURL} alt="User Avatar" />
            <p>Email: {user.email}</p>

            <button onClick={logout}>
                Log Out
            </button>
        </div>
    );
};

export default Home;
