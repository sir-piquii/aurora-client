import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DealerProvider } from "../context/DealerContext";
import Sidebar from "./Sidebar";
import Quotations from "./components/Quotations";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import { Toaster } from "sonner";
import DealerRegPortal from "./components/DealerRegPortal";
import Orders from "./components/Orders";
import { ChevronLeft, ChevronRight } from "lucide-react";
function DealerPanel() {
  useEffect(() => {
    document.title = "Dealer Registration";
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <DealerProvider>
      <div className="relative flex gap-2">
        <button
          className="lg:hidden fixed top-30 left-0 z-50 z-[1000] p-2 rounded-md bg-white shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ChevronLeft size={24} />
          ) : (
            <ChevronRight size={24} />
          )}
        </button>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          closeSideBar={() => {
            setIsSidebarOpen(false);
          }}
        />
        {/* Content Area */}
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="register" element={<DealerRegPortal />} />
            <Route path="quotations/" element={<Quotations />} />
            <Route path="orders/" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </DealerProvider>
  );
}

export default DealerPanel;
/**
 * <div className="dealer-content flex-1 p-6">
				<Routes>
					<Route path="add-dealer/:id" element={<AddDealer />} />
					<Route
						path="add-installations/:id"
						element={<AddInstallations />}
					/>
					<Route
						path="upload-certificate/:id"
						element={<UploadCertificateOfIncorporation />}
					/>
					<Route
						path="upload-tax-clearance/:id"
						element={<UploadTaxClearanceCertificate />}
					/>
					<Route
						path="upload-ids-of-directors/:id"
						element={<UploadIdsOfDirectors />}
					/>
				</Routes>
				<Routes>
					<Route path="quotations/:id" element={<Quotations />} />
				</Routes>
			</div>
 * 
 */
