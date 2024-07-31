import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, setUser } from "../redux/UserSlice";
import { signOut, updateProfile } from "firebase/auth";
import { UserTypes } from "../config/types";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { User: { user: UserTypes } }) => state.User
  );
  const navigate = useNavigate();

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      updateProfile(auth.currentUser!, {
        displayName: user?.email?.split("@")[0] ?? "Unknown",
      })
      dispatch(setUser(user));
    });
    return subscribe;
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
      <div className="text-lg xl:text md: text-2xl-2xl font-bold">
        <Link to="/">CODINGSPACE</Link>
        <p className="hidden xl:block md:block text-sm font-normal">{user.user && user.user.email}</p>
      </div>
      <div className="flex gap-3 items-center">
        <Link to="/" className="hidden md:block xl:block"><GoHome className="text-2xl font-semibold"/></Link>
        <Link to="/dashboard"><FaRegUser className="text-2xl font-semibold" /></Link>
        <Link to="/addblog" className="hidden md:block xl:block"><IoCreateOutline className="text-2xl font-semibold"/></Link>
        <div className="">
        {user.user && user.user ? (
          <button onClick={handelLogout} className="px-4 py-2 bg-red-500 rounded-md text-white">Logout</button>
        ) : (
          <Link to={"/login"} className="px-4 py-2 bg-blue-500 rounded-md text-white">Login</Link>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
