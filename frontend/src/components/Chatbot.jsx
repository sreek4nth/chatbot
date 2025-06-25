import React, { useState, useRef, useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { IoMdSend } from 'react-icons/io';
import { FaMicrophone } from 'react-icons/fa';
import chatbot from '../assets/chatbot.png';
import { AppContext } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';
import { toast, ToastContainer, Bounce } from 'react-toastify';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { backendurl, userData } = useContext(AppContext);
    const chatWindowRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);


    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);

            recognition.onresult = (event) => {
                const spokenText = event.results[0][0].transcript;
                setInput(spokenText);
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                if (event.error === 'not-allowed') {
                    toast.error("Microphone access denied. Please allow mic permission.");
                } else {
                    alert("Speech recognition error occurred: " + event.error);
                }
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        } else {
            alert("Speech Recognition is not supported in this browser.");
        }
    }, []);


    useEffect(() => {
        gsap.set(chatWindowRef.current, {
            width: '4rem',
            height: '4rem',
            bottom: '1rem',
            right: '1rem',
            borderRadius: '9999px',
            opacity: 1
        });
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            const username = userData?.fullname || 'there';
            const userId = userData?._id || 'guest';

            const fetchChatHistory = async () => {
                try {
                    const res = await fetch(`${backendurl}/api/chatbot/history/${userId}`);
                    const data = await res.json();

                    let formatted = [];

                    if (Array.isArray(data)) {
                        formatted = data.flatMap(chat =>
                            chat.messages?.map(m => ({
                                text: m.content,
                                sender: m.role === 'user' ? 'user' : 'bot'
                            })) || []
                        );
                    } else if (Array.isArray(data.messages)) {
                        formatted = data.messages.map(m => ({
                            text: m.content,
                            sender: m.role === 'user' ? 'user' : 'bot'
                        }));
                    }

                    setMessages([
                        ...formatted,
                        { text: `Hi ${username}, how can I assist you?`, sender: 'bot' }
                    ]);
                } catch (err) {
                    console.error("Error loading chat history:", err);
                    setMessages([{ text: `Hi ${username}, how can I assist you?`, sender: 'bot' }]);
                }
            };

            fetchChatHistory();

            gsap.to(chatWindowRef.current, {
                width: window.innerWidth < 768 ? '80%' : '30%',
                height: window.innerWidth < 768 ? '90%' : '70%',
                bottom: '2rem',
                right: '2rem',
                borderRadius: '1rem',
                opacity: 1,
                duration: 0.5,
                ease: "power3.out"
            });
        } else {
            gsap.to(chatWindowRef.current, {
                width: '4rem',
                height: '4rem',
                bottom: '1rem',
                right: '1rem',
                borderRadius: '9999px',
                opacity: 1,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    }, [isOpen, userData]);

    const handleSendMessage = async (overrideText = null) => {
        const message = overrideText || input;
        if (!message.trim() || isLoading) return;

        const newMessage = { text: message, sender: 'user' };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        setIsLoading(true);

        setMessages((prev) => [...prev, { text: 'Typing...', sender: 'bot' }]);

        try {
            const response = await fetch(`${backendurl}/api/chatbot/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, userId: userData?._id || 'guest' })
            });

            const data = await response.json();

            setMessages((prev) =>
                prev.map(msg =>
                    msg.text === 'Typing...' ? { text: data.reply, sender: 'bot' } : msg
                )
            );
            setIsLoading(false);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) =>
                prev.map(msg =>
                    msg.text === 'Typing...' ? { text: "I'm having trouble responding right now.", sender: 'bot' } : msg
                )
            );
        }
        setTimeout(() => setIsLoading(false), 10000);
    };

    return (
        <div
            ref={chatWindowRef}
            className="fixed bg-blue-500 text-white shadow-lg overflow-hidden 
                   flex items-center justify-center cursor-pointer z-50"
        >
            {isOpen ? (
                <div className="p-4 w-full h-full flex flex-col relative">
                    <h2 className="text-xl font-bold mb-4">AI Chatbot</h2>

                    <div className="flex-1 bg-white text-black p-3 rounded-md overflow-y-auto space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg text-sm max-w-[75%] 
                        ${msg.sender === 'user'
                                        ? 'bg-blue-500 text-white ml-auto'
                                        : 'bg-gray-200 text-black'}`}
                            >
                                <ReactMarkdown children={msg.text} />
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="mt-2 mb-8 flex items-center border border-gray-300 rounded-md">
                        <input
                            type="text"
                            placeholder="Type or speak your message..."
                            className="p-2 w-full rounded-l-md focus:outline-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={isLoading}
                        />
                        <button
                            className={`ml-2 p-3 mr-1 bg-blue-600 ${isListening ? 'text-red-600' : 'text-white'} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            onClick={() => recognitionRef.current?.start()}
                            disabled={isListening || isLoading}
                            title="Speak">
                            <FaMicrophone className="w-4 h-4" />
                        </button>
                        <button
                            className={`bg-blue-600 text-white p-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            onClick={() => handleSendMessage()}
                            disabled={isLoading}
                        >
                            <IoMdSend className="w-5 h-5" />
                        </button>
                    </div>

                    <div
                        className="absolute bottom-0 right-0 bg-white rounded-full shadow-md p-2 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="text-blue-500 w-5 h-5" />
                    </div>
                </div>
            ) : (
                <img
                    src={chatbot}
                    alt="Chatbot Icon"
                    className="w-16 h-16 drop-shadow-lg hover:scale-110 transition-transform duration-300"
                    onClick={() => setIsOpen(true)}
                />
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Bounce}
            />
        </div>
    );
};

export default Chatbot;
