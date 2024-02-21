import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css';
import { Header } from "./Header";
import { Home } from "./Home";
import { Search } from "./Search";
import { Navbar } from "./Navbar";
import { Login } from "./Login";
import { Create } from "./Create";
import { Delete } from "./Delete";
import { Edit } from "./Edit";


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
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;