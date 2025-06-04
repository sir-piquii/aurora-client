import "../App.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";
import "@fontsource/anta";
const PublicLayout = () => {
  return (
    <div className="grid w-screen overflow-x-hidden grid-rows-[auto_1fr_auto] p-0 m-0 box-border">
      <Navbar />
      <main className="min-h-screen w-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default PublicLayout;
