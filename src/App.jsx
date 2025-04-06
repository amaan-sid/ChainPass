import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MintTicket from "./pages/MintTicket";
import Upcoming from './pages/Upcoming'; 
// import CheckAccess from "./pages/CheckAccess";
import AdminPanel from "./pages/AdminPanel";
import MyTickets from "./pages/MyTickets";
import BuyTicket from "./pages/BuyTicket";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<BuyTicket />} />
            {/* <Route path="/mint" element={<MintTicket />} /> */}
            {/* <Route path="/check" element={<CheckAccess />} /> */}
            <Route path="/Upcoming" element={<Upcoming />} />
            {/* <Route path="/admin" element={<AdminPanel />} /> */}
            <Route path="/mytickets" element={<MyTickets />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
