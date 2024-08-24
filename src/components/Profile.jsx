import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No user data found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {userDetails ? (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            {/* <img
              src={userDetails.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            /> */}
            <h3 className="text-2xl font-semibold text-gray-800">
              Welcome {userDetails.firstName} 🙏🙏
            </h3>
          </div>
          <div className="mb-6">
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Name:</strong> {userDetails.name}
            </p>
            {/* <p className="text-lg text-gray-700">
              <strong>Last Name:</strong> {userDetails.lastName}
            </p> */}
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Loading...</p>
      )}
    </div>
  );
}

export default Profile;
