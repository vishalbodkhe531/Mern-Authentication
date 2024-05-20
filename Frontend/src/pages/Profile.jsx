import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { deleteUser, logoutUser } from "../app/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const deleteHandler = async () => {
    const result = confirm("Are You sure want to delete your account?");
    if (!result) {
      return;
    }
    const res = await fetch(`/api/user/${currentUser._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      toast.error(`Error while Delete your account try again later`, {
        duration: 3000,
        style: { borderRadius: "10px", background: "#fff", color: "#333" },
      });
      return;
    }
    if (data) {
      dispatch(deleteUser());
      toast.success(data.message, {
        duration: 3000,
        style: { borderRadius: "10px", background: "#fff", color: "#333" },
      });
    }
  };

  const logoutHandler = async () => {
    const result = confirm("Do you want to logout?");
    if (!result) {
      return;
    }
    const res = await fetch(`/api/user/logout`);
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      toast.error(`Error while logout your account try again later`, {
        duration: 3000,
        style: { borderRadius: "10px", background: "#fff", color: "#333" },
      });
      return;
    }
    if (data) {
      dispatch(logoutUser());
      toast.success(data.message, {
        duration: 3000,
        style: { borderRadius: "10px", background: "#fff", color: "#333" },
      });
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-28 w-auto rounded-full"
          src={currentUser.profilePic}
          alt="Profile Image"
          title="Profile Image"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={currentUser.name}
                readOnly
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-lg  ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                readOnly
                defaultValue={currentUser.email}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-lg  placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              EDIT PROFILE
            </button>
          </div>
        </form>

        <p className="mt-10 flex justify-between items-center">
          <button className="cursor-pointer" onClick={deleteHandler}>
            Delete Account
          </button>
          <button className="cursor-pointer" onClick={logoutHandler}>
            Logout
          </button>
        </p>
      </div>
    </div>
  );
};

export default Profile;
