import Footer from "./components/footer";
import Header from "./components/header";
import LoginForm from "./components/loginForm";
import logo from "./logo.svg";
import "./styles/global.scss";

function App() {
  return (
    <div style={{ backgroundColor: "#f3f4f6" }}>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default App;
