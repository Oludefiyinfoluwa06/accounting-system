import { Outlet } from "react-router-dom/dist";
import Navbar from "../components/Navbar";

const RootLayout = () => {
    return (
        <div>
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;