import "./App.css";
import Landing from "./components/Landing";
import { Routes, Route, useLocation } from "react-router-dom";
import Userpage from "./components/Userpage";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Popular from "./components/Popular";
import Post from "./components/Post";
import Detail from "./components/Detail";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const isLandingPage = location.pathname === "/";

  return (
    <div className="flex min-h-screen bg-neutral-primary">
      {!isLandingPage && <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
      <main className={`flex-1 ${!isLandingPage ? (isCollapsed ? 'ml-20' : 'ml-64') : ''} transition-all duration-300`}>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/userpage" element={<Userpage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/post" element={<Post />} />
            <Route path="/project-details" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}


export default App
