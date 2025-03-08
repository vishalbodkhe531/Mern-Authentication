import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../app/user/userSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      dispatch(signInStart());
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, Provider);
      const user = result.user;
      const res = await fetch("/api/user/googleAuth", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message, {
          duration: 3000,
          style: { borderRadius: "10px", color: "#333", background: "#fff" },
        });
        dispatch(signInFailure());
        return;
      }
      if (data) {
        toast.success(`Welcome ,${data.name}`, {
          duration: 3000,
          style: { borderRadius: "10px", color: "#333", background: "#fff" },
        });
        navigate("/");
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      dispatch(signInFailure(false));
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      type={"button"}
      className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed uppercase"
    >
      {loading ? `Loading...` : `Continue with Google`}
    </button>
  );
};

export default OAuth;
