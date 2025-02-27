import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Utils/UserSlice.js";
import { TextField, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";

const UserDataForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirectToUser = (id) => {
        navigate(`/user/${id}`);
    }

    const users = useSelector((state) => state.users.users); 
    console.log("User Data: ",users);

    // State for form fields
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
    });

    // State for unsaved changes
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // State for unsaved changes popup
    const [showUnsavedChangesPopup, setShowUnsavedChangesPopup] = useState(false);

    // Auto-generate user ID
    const generateUserId = () => `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

   
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setHasUnsavedChanges(true);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = generateUserId();
        const userData = { ...formData, id: userId };

        // Dispatch action to Redux store
        dispatch(addUser(userData));
        console.log(userData);
        setHasUnsavedChanges(false);
        alert("Data saved successfully!");

        // Clear form fields after submission
        setFormData({
            name: "",
            address: "",
            email: "",
            phone: "",
        });
    };

    // Warn user about unsaved changes before closing the browser
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
                setShowUnsavedChangesPopup(true);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    // Close unsaved changes popup
    const handleClosePopup = () => {
        setShowUnsavedChangesPopup(false);
    };

    return (
        <div className="flex flex-col md:flex-row w-[100%] gap-5 justify-center  pt-10">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-h-[500px] "
            >
                <h1 className="text-2xl font-bold mb-6 text-center">User Data Form</h1>

                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mt-6"
                >
                    Submit
                </Button>
            </form>

            {/* Display Submitted Users */}
            <div className=" w-full max-w-md bg-white p-4 rounded-lg shadow-lg overflow-y-auto max-h-[500px] ">
                <h2 className="text-xl font-semibold text-center mb-4">Submitted Users</h2>
                <ul className="space-y-2">
                    {users?.length > 0 ? (
                        users.map((user) => (
                            <li key={user.id} className="p-2 border rounded cursor-pointer bg-gray-50" onClick={() => redirectToUser(user.id)}>
                                <strong>{user.name}</strong> ({user.email})
                                <p>ID: {user.id}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No users added yet.</p>
                    )}
                </ul>
            </div>

            {/* Unsaved Changes Popup */}
            <Dialog
                open={showUnsavedChangesPopup}
                onClose={handleClosePopup}
                aria-labelledby="unsaved-changes-dialog"
            >
                <DialogTitle id="unsaved-changes-dialog">
                    You have unsaved changes. Are you sure you want to leave?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">
                        Stay
                    </Button>
                    <Button onClick={() => window.close()} color="secondary">
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserDataForm;
