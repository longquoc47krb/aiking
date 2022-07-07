import Footer from "./components/footer";
import Header from "./components/header";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./styles/global.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <div style={{ backgroundColor: "#f3f4f6" }}>
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
