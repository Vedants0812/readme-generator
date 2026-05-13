import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 README Generator API is running");
});

// ✅ Generate README (NO API - FREE)
app.post("/generate", (req, res) => {
  const { name, description, tech } = req.body;

  // Validation
  if (!name || !description || !tech) {
    return res.status(400).json({
      error: "All fields (name, description, tech) are required",
    });
  }

  // Generate README
  const readme = `
# ${name}

## 📌 Overview
${description}

## 🚀 Features
- Easy to use
- Clean and simple UI
- Fast README generation

## 🛠 Tech Stack
${tech}

## ⚙️ Installation
\`\`\`bash
git clone https://github.com/your-username/${name}
cd ${name}
npm install
\`\`\`

## ▶️ Usage
\`\`\`bash
npm start
\`\`\`

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repo and submit a PR.

## 📄 License
MIT License
`;

  res.json({ result: readme });
});

// ✅ Dynamic port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
