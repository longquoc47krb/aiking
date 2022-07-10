import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./pages/registerForm";
import "./styles/global.scss";
import { UserContext } from "./hooks/UserContext";
import useFindUser from "./hooks/useFindUser";
function App() {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <div style={{ backgroundColor: "#f3f4f6", width: "100%", height: "100%" }}>
      <Header />
      <Router>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<RegisterForm />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
          </Routes>
        </UserContext.Provider>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
