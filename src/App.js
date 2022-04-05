import LandingPage from "../src/Pages/LandingPage";
import SignUp from "./Components/Signup/Signup";
import SlackPage from "./Pages/SlackPage";
import TestAPI from "./Utils/TestAPI";

function App() {
  return (
    <>
      <LandingPage />
      <SignUp />
      <SlackPage />
    </>
  );
}

export default App;
