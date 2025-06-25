import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Chat from '../model/chat.model.js';

dotenv.config();

const filePath = path.join(process.cwd(), 'data', 'college.txt');

// Load the file content once at startup
let collegeData = '';
try {
  collegeData = fs.readFileSync(filePath, 'utf-8');
  console.log("📘 College data loaded successfully.");
} catch (err) {
  console.error("Failed to load college data:", err.message);
}

// Optional predefined answers
const responses = {
  1: ["St. Joseph's College of Engineering and Technology, Palai is a private engineering college located in Pala, Kerala, India."],
  2: ["Dr. Rahul Shajan (HoD MCA)"],
};

export const chatbotController = async (req, res) => {
  const { message, userId } = req.body;

  let chat;
  try {
    chat = await Chat.findOne({ userId });

    if (!chat) {
      chat = await Chat.create({
        userId,
        messages: [{ role: 'user', content: message }]
      });
    } else {
      chat.messages.push({ role: 'user', content: message });
    }
  } catch (err) {
    console.error("Failed to save user message:", err.message);
  }


  // Direct replies for common questions
  if (message === 'where is sjcet?') {
    return res.json({ reply: responses[1] });
  } else if (message === 'who is the hod of mca?') {
    return res.json({ reply: responses[2] });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "collegechatbot",
        "X-Title": "Chatbot for College",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // model: "deepseek/deepseek-r1-zero:free",
        //model: "openrouter/quasar-alpha",   //limitation overed
         model: "deepseek/deepseek-chat-v3-0324:free",
        //model: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",  //good but not faster
        //model:"mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are a helpful, friendly chatbot for a college website. 
          Use only the following context to answer concisely: ${collegeData} 
          ⚠️ Strictly follow these rules:
          - Never say "To answer your question", "Based on the context", or similar.
          - Never include unnecessary paragraphs.
          - Keep responses short, simple, and clear like a casual conversation.
          - Format answers using **Markdown** for emphasis and clarity.
          - If the user asks for teacher details, provide only the name and designation.
          - When describing about fees, use the format: "The fees for [course] is [amount] per year and smester based fees structure instead of paragraph."
          - If possible make the content like a heading and a short description.
          - if the user asks questions from out of the context,tell them it is out of context.
          - Use Markdown formatting: **Bold** the teacher names, keep their designation normal.`
          
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 400
      })
    });

    const data = await response.json();
    console.log("API Response:", data);
    console.log("API Full Choice:", JSON.stringify(data.choices[0], null, 2));

    const choice = data.choices?.[0]?.message;
    const deepseekReply = choice?.content?.trim() || choice?.reasoning?.trim() || "Sorry, I couldn't understand that.";


    const cleanedReply = deepseekReply.replace(/\\boxed{(.*?)}/g, '$1');

    try {
      if (chat) {
        chat.messages.push({ role: 'assistant', content: cleanedReply.trim() });
        await chat.save();
      }
    } catch (err) {
      console.error("Failed to save assistant reply:", err.message);
    }


    return res.json({ reply: cleanedReply.trim() });


  } catch (error) {
    console.error("DeepSeek API Error:", error);
    return res.status(500).json({ reply: "I'm facing some technical issues. Please try again later." });
  }
};



export const getChatHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const chat = await Chat.findOne({ userId });

    if (!chat) {
      return res.status(200).json({ messages: [] }); // Return empty history
    }

    return res.status(200).json({ messages: chat.messages });
  } catch (error) {
    console.error("Failed to fetch chat history:", error.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};