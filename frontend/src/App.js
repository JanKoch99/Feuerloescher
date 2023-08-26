import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserConnection from "./pages/UserConnection";
import NotifyFireDep from "./pages/NotifyFireDep";
import FakeTrigger from "./pages/FakeTrigger";

function App() {
    const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/userConnection" element={<UserConnection />}/>
            <Route path="/notifyFireDepartment" element={<NotifyFireDep />}/>
            <Route path="/fakeTrigger" element={<FakeTrigger/>}/>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
