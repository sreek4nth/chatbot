
# 🤖 SJCET Chatbot

SJCET Chatbot is an AI-powered assistant built to provide real-time, up-to-date information about St. Joseph's College of Engineering and Technology (SJCET). It scrapes data from the official SJCET website and uses natural language processing (NLP) to answer queries about departments, courses, faculty, and more.

---

## 📸 Screenshot

![Chatbot Screenshot](./preview.png)

---

## ✨ Features

- 🔍 **Live Web Scraping** – Extracts the latest information directly from the SJCET website.
- 💬 **AI-Powered Chat** – Understands user queries using NLP.
- 🧠 **Summarization Engine** – Converts large content into brief, digestible answers.
- 🕒 **Auto Data Refresh** – Keeps information current by regularly updating the scraped content.
- 🌐 **Full-stack App** – Built using the modern **MERN stack** for performance and scalability.

---

## 🛠 Tech Stack

<div align="center">

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | React.js, Tailwind CSS      |
| Backend     | Node.js, Express.js         |
| Database    | MongoDB                     |
| Web Scraping| Cheerio.js / Puppeteer      |
| NLP & AI    | Hugging Face Transformers   |

</div>

---

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/jerryjames2001/SJCET-Chatbot.git
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Start Backend Server**
```bash
npm start
```

5. **Start Frontend Server**
```bash
cd ../frontend
npm run dev
```

6. **Visit in browser**
```
http://localhost:3000
```

---

## 🧠 NLP & AI Integration

- The backend triggers a Python script for NLP using **Hugging Face Transformers**.
- Prompts are designed to return **concise** and **informative** answers.
- Queries like _"Who is the HOD of CSE?"_ or _"Tell me about departments"_ are handled with real-time scraped responses.

---

## 📂 Project Structure

```
SJCET-Chatbot/
├── backend/
│   ├── routes/
│   ├── scraper/
│   ├── nlp/
├── frontend/
│   ├── components/
│   ├── context/
│   └── assets/
```

---

## 💡 Future Enhancements

- 📅 Event-based query support (college fests, holidays)
- 🗣️ Voice Assistant integration
- 📲 Deployable PWA version

---

## 🙋‍♂️ Maintainers

**Jerry James**  
🔗 [Website](https://jerry-james.me) | [GitHub](https://github.com/jerryjames2001)

**Sreekanth Pradeep**  
🔗 [GitHub](https://github.com/sreek4nth)

---


<div align="center">
  <h2>☕ Support My Work</h2>
  <a href="https://ko-fi.com/B0B615YOK7">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Buy Me a Coffee at ko-fi.com" />
  </a>
</div>
