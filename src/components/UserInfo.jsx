import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateUser } from "../Utils/UserSlice"; // Assuming you will create an updateUser action
import { useParams } from "react-router-dom";

const UserInfo = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const userData = useSelector((state) => state.users.users);
    console.log("User ka data hai ye toh: ",userData);
    const user= userData.find((user)=>user.id.toString()===id.toString());
    
    const [bio, setBio] = useState(user?.bio || "");

    if (!user) {
        return (
            <div className="p-6 text-center text-red-500 font-semibold">
                User not found!
            </div>
        );
    }

    // Handle bio update
    const handleSave = () => {
        dispatch(updateUser({ id: user.id, bio }));
        alert("Bio updated successfully!");
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-5">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                User Information
            </h2>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">{user?.name}</h3>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <p className="text-sm text-gray-500">{user?.phone}</p>
                        <p className="text-sm text-gray-500">{user?.address}</p>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                        Edit Your Bio:
                    </h4>
                    <ReactQuill value={bio} onChange={setBio} theme="snow" />
                </div>

                <button
                    onClick={handleSave}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
