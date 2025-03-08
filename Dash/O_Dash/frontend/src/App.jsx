import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";

import Form from "./components/Form";
import Upcoming from "./components/Upcoming";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Upcoming />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
