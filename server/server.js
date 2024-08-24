// import express from 'express';
// import { marked } from 'marked';
// import cors from 'cors';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import 'dotenv/config'; // Load environment variables from .env file
// // import { doc, getDoc } from 'Firebase/firestore';
// // import { db, auth } from "../config/Firebase.js";
// // import { onAuthStateChanged } from 'firebase/auth';

// const app = express();
// const PORT = 3001;

// // Middleware to enable CORS for all routes
// app.use(cors());

// // SSE Endpoint
// app.get("/recipestream", async (req, res) => {
//   const ingredients = req.query.ingredients;
//   const mealType = req.query.mealType;
//   const cuisine = req.query.cuisine;
//   const cookingTime = req.query.cookingTime;
//   const complexity = req.query.complexity;

//   console.log(req.query);

//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   // Function to send the entire response
//   const sendEvent = (response) => {
//     res.write(`data: ${JSON.stringify(response)}\n\n`);
//   };

//   const prompt = [];
//   prompt.push("Generate a recipe that incorporates the following details:");
//   prompt.push(`[Ingredients: ${ingredients}]`);
//   prompt.push(`[Meal Type: ${mealType}]`);
//   prompt.push(`[Cuisine Preference: ${cuisine}]`);
//   prompt.push(`[Cooking Time: ${cookingTime}]`);
//   prompt.push(`[Complexity: ${complexity}]`);
  
//   prompt.push(
//     "Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided."
//   );
//   prompt.push(
//     "The recipe should highlight the fresh and vibrant flavors of the ingredients."
//   );
//   prompt.push(
//     "Also give the recipe a suitable name in its local language based on cuisine preference."
//   );

//   try {
//     await run(prompt, sendEvent);
//   } catch (error) {
//     console.error("Error during run function:", error);
//     res.status(500).send("Internal Server Error");
//   }

//   req.on("close", () => {
//     res.end();
//   });
// });

// const API_KEY = "AIzaSyA9STUr-4l42Wt8Jq-krs3K2kVe5p9BH40"; 
// const genAI = new GoogleGenerativeAI(API_KEY);

// async function run(prompt, callback) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
//     const result = await model.generateContent(prompt);
    
//     const response = result.response;
//     if (response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
//       const generatedText = marked(response.candidates[0].content.parts.map(part => part.text).join("\n"));
//       console.log("Generated Text:", generatedText);
//       callback(generatedText);
//     } else {
//       console.log("No valid response structure found.");
//     }
//   } catch (error) {
//     console.error("Error generating content:", error);
//   }
// }

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import { marked } from 'marked';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'; // Load environment variables from .env file

const app = express();
const PORT = 3001;

// Middleware to enable CORS for all routes
app.use(cors());

// SSE Endpoint
app.get("/recipestream", async (req, res) => {
  const ingredients = req.query.ingredients;
  const mealType = req.query.mealType;
  const cuisine = req.query.cuisine;
  const cookingTime = req.query.cookingTime;
  const complexity = req.query.complexity;

  console.log(req.query);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send the entire response
  const sendEvent = (response) => {
    res.write(`data: ${JSON.stringify(response)}\n\n`);
  };

  const prompt = [
    "Generate a recipe that incorporates the following details:",
    `[Ingredients: ${ingredients}]`,
    `[Meal Type: ${mealType}]`,
    `[Cuisine Preference: ${cuisine}]`,
    `[Cooking Time: ${cookingTime}]`,
    `[Complexity: ${complexity}]`,
    "Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided.",
    "The recipe should highlight the fresh and vibrant flavors of the ingredients.",
    "Also give the recipe a suitable name in its local language based on cuisine preference."
  ];

  try {
    await run(prompt, sendEvent);
  } catch (error) {
    console.error("Error during run function:", error);
    res.status(500).send("Internal Server Error");
  }

  req.on("close", () => {
    res.end();
  });
});

const API_KEY = "AIzaSyA9STUr-4l42Wt8Jq-krs3K2kVe5p9BH40"; 
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(prompt, callback) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    
    const response = result.response;
    if (response?.candidates?.[0]?.content?.parts) {
      const generatedText = marked(response.candidates[0].content.parts.map(part => part.text).join("\n"));
      console.log("Generated Text:", generatedText);
      callback(generatedText);
    } else {
      console.log("No valid response structure found.");
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
