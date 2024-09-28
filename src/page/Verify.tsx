import { sendEmailVerification } from "firebase/auth";
// import { UserTypes } from '../config/types';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

export default function Verify({}: Props) {
  const user = useSelector((state: { User: { user: any } }) => state.User);
  const sendVerifyLink = async () => {
    try {
      await sendEmailVerification(user.user);
      toast.success("Email sent successfully");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <main className="mt-8 md:mt-16 lg:mt-20">
        <h1 className="text-center font-bold text-3xl mb-4">Please verify your email</h1>
      <button
        className="px-4 py-2 bg-black text-white rounded-md w-full mt-4"
        onClick={sendVerifyLink}
      >
        Verify
      </button>
    </main>
  );
}
