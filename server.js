
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NILU backend is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(
      `You are NILU, a friendly female Hinglish AI assistant. Reply naturally in Hinglish. User: ${message}`
    );

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("NILU error:", error.message);
    res.status(500).json({ error: "AI response failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NILU backend listening on port ${PORT}`);
});

