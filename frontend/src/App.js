import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./pages/registerForm";
import "./styles/global.scss";
function App() {
  return (
    <div className='background'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<RegisterForm />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
