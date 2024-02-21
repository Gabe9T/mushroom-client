import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css';
import { Header } from "./Header";
import { Home } from "./Home";
import { Search } from "./Search";
import { Navbar } from "./Navbar";
import { Login } from "./Login";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;