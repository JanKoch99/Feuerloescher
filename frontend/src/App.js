import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";

import UserConnection from "./pages/UserConnection";
import NotifyFireDep from "./pages/NotifyFireDep";
import TestingTool from "./pages/TestingTool";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
    const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<UserConnection />} />
            <Route path="/userConnection" element={<UserConnection />}/>
            <Route path="/notifyFireDepartment" element={<NotifyFireDep />}/>
            <Route path="/testingTool" element={<TestingTool/>}/>
            <Route path="/dashboard" element={user ? <Dashboard /> : <Login />}/>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
