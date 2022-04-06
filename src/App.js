import LandingPage from "../src/Pages/LandingPage";
import SignUp from "./Components/Signup/Signup";
import SlackPage from "./Pages/SlackPage";
import TestAPI from "./Utils/TestAPI";

import { Route, Routes, Navigate } from "react-router-dom";
import UserLogin from "./Components/Login/Login";

// function PrivateRoute({ children }) {
//   const auth = useAuth();
//   return auth ? children : <Navigate to="/" />;
// }

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<UserLogin />} />
        <Route
          path="/SlackPage"
          element={
            <SlackPage />
            // <PrivateRoute>
            //   <SlackPage />
            // </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
