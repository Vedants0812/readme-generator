import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 README Generator API is running");
});

// ✅ Main API route
app.post("/generate", async (req, res) => {
  const { name, description, tech } = req.body;

  // Validation
  if (!name || !description || !tech) {
    return res.status(400).json({
      error: "All fields (name, description, tech) are required",
    });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate a professional GitHub README for:

Project Name: ${name}
Description: ${description}
Tech Stack: ${tech}

Include:
- Overview
- Features
- Installation
- Usage
- Tech Stack section`
        }
      ],
    });

    res.json({
      result: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("❌ FULL ERROR:", err); // 👈 IMPORTANT

    res.status(500).json({
      error: err.message,
    });
  }
});

// ✅ Dynamic port (Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
