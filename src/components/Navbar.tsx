import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, setUser } from "../redux/UserSlice";
import { signOut, updateProfile } from "firebase/auth";
import { UserTypes } from "../config/types";
import { GoHome } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

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
      });
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
    <nav className="p-2 flex justify-between items-center bg-white">
      {/* left */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <h1 className="text-white bg-black px-3 py-2 rounded-md w-fit font-bold">
            CodingSpace
          </h1>
        </Link>
        <div>
          <Input placeholder="Search..." size={80} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button>
          <Link to="/addblog">Create Post</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage
                src={user.user?.photoUrl ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Link to="/profile">Dashboard</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/addblog">Create Post</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/reading">Reading List</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/setting">Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {user.user && user.user ? (
                <span onClick={handelLogout}>Logout</span>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
