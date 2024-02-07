import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const login = await signInWithEmailAndPassword(auth, email, password);
      if (login) {
        navigate("/");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <main className="">
      <form onSubmit={handelSubmit} className="mt-20 w-full">
        <h1 className="text-2xl font-semibold my-3">Login to your account</h1>
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
            type="password"
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
          Don't have an account?{" "}
          <Link className="text-blue-500" to={"/signup"}>
            create one
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
