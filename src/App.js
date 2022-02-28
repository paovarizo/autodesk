import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserDetails from './components/UserDetails/UserDetails';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/details/:name/:lastname/:email/:phone" element={<UserDetails />}>
      </Route>
    </Routes>
  </BrowserRouter>  
  );
}

export default App;
