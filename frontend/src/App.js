import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";

import UserConnection from "./pages/UserConnection";
import NotifyFireDep from "./pages/NotifyFireDep";
import TestingTool from "./pages/TestingTool";

function App() {
    const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
          {/*<Navbar />*/}
        <div className="pages">
          <Routes>
            <Route path="/" element={<UserConnection />} />
            <Route path="/userConnection" element={<UserConnection />}/>
            <Route path="/notifyFireDepartment" element={<NotifyFireDep />}/>
            <Route path="/testingTool" element={<TestingTool/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
