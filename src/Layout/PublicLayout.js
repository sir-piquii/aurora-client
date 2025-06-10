import "../App.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";
import "@fontsource/anta";
/**
 * PublicLayout is a layout component that structures the public-facing pages of the application.
 * It arranges the Navbar at the top, the main content (using React Router's Outlet) in the center,
 * and the Footer at the bottom, using a CSS grid layout.
 *
 * @component
 * @returns {JSX.Element} The layout containing Navbar, main content, and Footer.
 */
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
