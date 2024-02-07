import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, setUser } from "../redux/UserSlice";
import { signOut } from "firebase/auth";
import { UserTypes } from "../config/types";
// import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const [width, setWidth] = useState(0);
  // const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: { User: { user: UserTypes } }) => state.User);
  const navigate = useNavigate();

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      user.displayName = user.email.split("@")[0] || '';
      dispatch(setUser(user));
    });
    return subscribe;
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
    console.log(width)
  }, []);

  const handelLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUserData());
    } catch (error) {
      console.log(error);
    }
    navigate("/login");
  };
  return (
    <nav className="flex w-full p-4 justify-between shadow-md relative">
      <div className="text-2xl font-bold">
        CODINGSPACE{" "}
        <p className="text-sm font-normal">{user.user && user.user.email}</p>
      </div>
      {/* {width > 500 ? (
        <>
        <div onClick={() => setShow(!show)}><IoMdMenu className="text-2xl"/></div>
        <div className="flex gap-3 flex-col text-center absolute right-10 top-10 bg-slate-500 text-white p-4 rounded-lg " style={{ display: show ? "flex" : "none"}}>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/addblog">Create</Link>
          {user.user && user.user ? (
            <button onClick={handelLogout} className="">Logout</button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
        </>
      ) : ( */}
        <div className="flex gap-3 items-center">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/addblog">Create</Link>
          {user.user && user.user ? (
            <button onClick={handelLogout}>Logout</button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      {/* )} */}
    </nav>
  );
};

export default Navbar;
