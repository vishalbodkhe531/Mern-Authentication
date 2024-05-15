import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
const OAuth = () => {
  const handleClick = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleClick}
      type={"button"}
      className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed uppercase"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
