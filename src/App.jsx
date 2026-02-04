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
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import PostManagement from "./components/admin/PostManagement";

function App() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const isLandingPage = location.pathname === "/";

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-neutral-primary">
        {!isLandingPage && <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
        <main className={`flex-1 ${!isLandingPage ? (isCollapsed ? 'ml-20' : 'ml-64') : ''} transition-all duration-300`}>
          <div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/userpage" element={
                <ProtectedRoute>
                  <Userpage />
                </ProtectedRoute>
              } />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="/popular" element={
                <ProtectedRoute>
                  <Popular />
                </ProtectedRoute>
              } />
              <Route path="/post" element={
                <ProtectedRoute>
                  <Post />
                </ProtectedRoute>
              } />
              <Route path="/project-details/:id" element={
                <ProtectedRoute>
                  <Detail />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/edit-profile" element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute adminOnly={true}>
                  <UserManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/posts" element={
                <ProtectedRoute adminOnly={true}>
                  <PostManagement />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}


export default App

