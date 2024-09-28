import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import AddBlog from "./page/AddBlog";
import Dashboard from "./page/Dashboard";
import SingleBLog from "./page/SingleBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./page/Login";
import Signup from "./page/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./page/Profile";
import EditBlog from "./page/EditBlog";
import ProtectAuth from "./components/ProtectAuth";
import Verify from "./page/Verify";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="body">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/verify"
          element={
            <ProtectedRoute>
              <Verify />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addblog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route path="/blog/:id" element={<SingleBLog />} />
        <Route
          path="/login"
          element={
            <ProtectAuth>
              <Login />
            </ProtectAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectAuth>
              <Signup />
            </ProtectAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editblog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
      </div>
    </>
  );
};

export default App;
