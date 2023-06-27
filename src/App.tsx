import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMain from "./home/HomeMain";
import WeatherMain from "./Weather/WeatherMain";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/weather" element={<WeatherMain />} />
          <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
