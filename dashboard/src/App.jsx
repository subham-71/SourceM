import './App.css'
import AuthProvider from "./contexts/AuthContext";
import Router from "./router/Router";
import Navbar from './components/Navbar';

function App() {
  return (
      <div className="App">
          <AuthProvider>
              <Router />
          </AuthProvider>
      </div>
  );
}

export default App
