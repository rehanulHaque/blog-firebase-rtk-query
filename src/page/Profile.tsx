import { useState } from "react";
import { useSelector } from "react-redux";
import { UserTypes } from "../config/types";
// import { useUpdateEmailMutation, useUpdateNameMutation } from "../services/blogApi";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const user = useSelector((state: {User: {user: UserTypes}}) => state.User.user);
  // const [updateEmail] = useUpdateEmailMutation()
  // const [updateName] = useUpdateNameMutation()

  const handelNameUpdate = async () => {
    if (name) {
        try {
            // await updateName(name)
        } catch (error) {
            console.log(error)
        }
    }
    setIsEditing(false);
  };

  const handelEmailUpdate = async () => {
    try {
        // await updateEmail(email)
    } catch (error) {
        console.log(error)
    }
    setIsEditing(false);
  };

  return (
    <main className="">
      <div className="border-b-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold mt-7 px-3 pb-2">Profile</h1>
        <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </button>
      </div>
      <div className="mt-5" style={{ display: isEditing ? "none" : "block" }}>
        <div>Name: {user && user.displayName}</div>
        <div>Email: {user && user.email}</div>
        <div>Photo: {user && user.photoUrl}</div>
      </div>
      <div className="mt-5" style={{ display: isEditing ? "block" : "none" }}>
        <div>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-black px-4 py-1 outline-none rounded-md"
          />
          <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
          onClick={handelNameUpdate}
        >
          Update
        </button>
        </div>
        <div>
          Email:{" "}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black px-4 py-1 outline-none rounded-md my-3"
          />
          <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
          onClick={handelEmailUpdate}
        >
          Update
        </button>
        </div>
        <div>
          Photo:{" "}
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="border border-black px-4 py-1 outline-none rounded-md my-3"
          />
        </div>
        
      </div>
    </main>
  );
};

export default Profile;
