import React, { useEffect, useRef, useState } from 'react';
import { db } from "./Firebase.jsx"; // Import the Firestore database
import { doc, setDoc } from "firebase/firestore";
import sanitizeHtml from 'sanitize-html';
import RecipeCard from "./RecipeCard";
import { auth } from './Firebase.jsx'; // Ensure this path is correct

function Recipes() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [url, setUrl] = useState("");
  const eventSourceRef = useRef(null);

  useEffect(() => {
    return () => {
      closeEventStream();
    };
  }, []);

  useEffect(() => {
    if (recipeData) {
      closeEventStream();
      initializeEventStream();
    }
  }, [recipeData]);

  const initializeEventStream = () => {
    if (!recipeData) return;

    const recipeInputs = { ...recipeData };
    const queryParams = new URLSearchParams(recipeInputs).toString();
    const constructedUrl = `http://localhost:3001/recipestream?${queryParams}`;
    setUrl(constructedUrl);

    eventSourceRef.current = new EventSource(constructedUrl);

    eventSourceRef.current.onmessage = (event) => {
      setRecipeText(event.data);
    };

    eventSourceRef.current.onerror = (error) => {
      console.error("EventSource error:", error);
      closeEventStream();
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  const onSubmit = (data) => {
    setRecipeText('');
    setRecipeData(data);
  };

  const saveBookmark = async () => {
    if (!recipeData) return;

    try {
      const user = auth.currentUser; // Get the current user
      if (user) {
        const userId = user.uid;
        await setDoc(doc(db, "users", userId, "bookmarks", new Date().toISOString()), {
          recipeData: recipeData,
          recipeText: recipeText,
          createdAt: new Date(),
        });
        alert("Recipe bookmarked successfully!");
      } else {
        alert("User is not logged in.");
      }
    } catch (error) {
      console.error("Error saving bookmark:", error);
      alert("Failed to bookmark recipe.");
    }
  };

  const formattedText = recipeText.replace(/\n/g, '<br/>');
  const sanitizedText = sanitizeHtml(formattedText, {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'br'],
    allowedAttributes: {}
  });

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <RecipeCard onSubmit={onSubmit} />
        <div className="w-full md:w-[400px] h-[565px] text-gray-800 p-4 border rounded-lg shadow-lg overflow-y-auto bg-white">
          <div dangerouslySetInnerHTML={{ __html: sanitizedText }} />
          {recipeText && (
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={saveBookmark}
            >
              Bookmark Recipe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
