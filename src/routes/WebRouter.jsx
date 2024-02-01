import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Supplier } from "../context/Context";
const ContactList = lazy(() => import("../components/ContactList"));
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const AddContact = lazy(() => import("../components/AddContact"));

function WebRouter() {
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{ width: "100%", height: "100vh" }}
            className="d-grid-center"
          >
            <h1>Loading...</h1>
          </div>
        }
      >
        <Supplier>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<ContactList />} />
              <Route path="/addcontact" element={<AddContact />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </Supplier>
      </Suspense>
    </>
  );
}

export default WebRouter;
