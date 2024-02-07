import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const userCurr = auth.currentUser;
      if (userCurr) {
        await updateProfile(userCurr, {
          displayName: email.split("@")[0],
        });
      }
      if (user) {
        toast.success("Account created successfully");
        setLoading(false);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <main className="">
      <form onSubmit={handelSubmit} className="mt-20 w-full">
        <h1 className="text-2xl font-semibold my-3">Create an account</h1>
        <div>
          <input
            type="text"
            className="border border-black px-4 py-2 outline-none rounded-md w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            className="border border-black px-4 py-2 outline-none rounded-md w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={loading}
          className="border border-black px-4 py-2 w-full rounded-md bg-black text-white disabled:bg-gray-700"
        >
          Login
        </button>
        <p className="text-center mt-3">
          already have an account?{" "}
          <Link className="text-blue-500" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;
