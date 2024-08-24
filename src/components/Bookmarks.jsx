import React, { useEffect, useState } from 'react';
import { db } from "./Firebase.jsx"; // Import the Firestore database
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth } from './Firebase'; // Ensure this path is correct

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const user = auth.currentUser; // Get the current user
      if (user) {
        try {
          const userId = user.uid;
          const q = query(collection(db, "users", userId, "bookmarks"));
          const querySnapshot = await getDocs(q);
          const bookmarksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBookmarks(bookmarksData);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      }
    };

    fetchBookmarks();
  }, []);

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userId = user.uid;
        await deleteDoc(doc(db, "users", userId, "bookmarks", id));
        setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
      } catch (error) {
        console.error("Error deleting bookmark:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>
      <div className="flex flex-col gap-4">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark, index) => (
            <div key={bookmark.id} className="p-4 border rounded-lg bg-white shadow-md">
              <h2 className="text-xl font-semibold">{`${index + 1}. ${bookmark.mealName || "Recipe"}`}</h2>
              <div dangerouslySetInnerHTML={{ __html: bookmark.recipeText }} />
              <button 
                onClick={() => handleDelete(bookmark.id)} 
                className="mt-2 bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No bookmarks found.</p>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;






