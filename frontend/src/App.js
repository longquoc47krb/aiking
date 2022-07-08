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
function App() {
  return (
    <div style={{ backgroundColor: "#f3f4f6", width: "100%" }}>
      <Header />
      <Router>
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<RegisterForm />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
