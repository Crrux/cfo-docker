import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./layout/header/header";
import Footer from "./layout/footer/footer";

import Home from "./pages/home/home";
import Class from "./pages/class/class";
import Planning from "./pages/planning/planning";
import Offers from "./pages/offers/offers";
import Contact from "./pages/contact/contact";
import Events from "./pages/events/events";
import Error from "./pages/error/error";
import MentionLegale from "./pages/legal_notices/legal_notices";
import HelmetRendering from "./layout/helmet/helmet";
import Popup from "./components/popup/popup";
import Home_redir from "./pages/home/home_redir";

function App() {
  return (
    <>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <HelmetRendering />
        <Popup />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cours" element={<Class />} />
          <Route path="planning" element={<Planning />} />
          <Route path="offres" element={<Offers />} />
          {/* <Route path="coachs" element={<Coachs />} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="events" element={<Events />} />
          <Route path="*" element={<Error />} />
          <Route path="mentions-legales" element={<MentionLegale />} />
          <Route path="home" element={<Home_redir />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
