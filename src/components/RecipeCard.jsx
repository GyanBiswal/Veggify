import React, { useState } from "react";

const RecipeCard = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [complexity, setComplexity] = useState("");

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    console.log("Submitting recipe data:", recipeData);
    onSubmit(recipeData);
  };

  return (
    <div className="w-full md:w-[450px] max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Generate Your Recipe</h2>
        <div className="space-y-4">
          {[
            { label: "Ingredients", value: ingredients, setter: setIngredients },
            { label: "Meal Type", value: mealType, setter: setMealType },
            { label: "Cuisine Preference", value: cuisine, setter: setCuisine },
            { label: "Cooking Time", value: cookingTime, setter: setCookingTime },
            { label: "Complexity", value: complexity, setter: setComplexity },
          ].map(({ label, value, setter }) => (
            <div key={label} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Generate Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;




