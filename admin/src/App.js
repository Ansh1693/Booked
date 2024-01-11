import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import HomeScreen from "./pages/Hotels/HomeScreen";
import Property from "./pages/SingleProperty/Property";
import UserStateContext from "./Context/UserContext";
import HotelStateContext from "./Context/HotelContext";

function App() {
  return (
    <>
      <UserStateContext>
        <HotelStateContext>
          <Router>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/hotels/:hotelId" element={<Property />} />
            </Routes>
          </Router>
        </HotelStateContext>
      </UserStateContext>
    </>
  );
}

export default App;
