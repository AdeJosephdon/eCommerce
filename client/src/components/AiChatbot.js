import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import CompanyAndApiData from "./CompanyAndApiData";

function AiChatbot({ toggleAiChat }) {
  // Chat History
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: CompanyAndApiData,
    },
  ]);

  // Auto Scrolling
  const chatBodyRef = useRef();

  // Form starts here
  const inputRef = useRef();

  // Button loading state

  function handleFormSubmit(e) {
    // Preventing default form submission
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // console.log(userMessage)
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // The "Thinking part" of the bot message
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  }
  // Form Ends here

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="chatbot-popup">
      <div className="chat-header">
        <div className="header-info">
          <Icon icon="hugeicons:ai-chat-02" width="24" height="24" />
          <h2 className="logo-text">Exclusivebot</h2>
        </div>

        <button className="material-symbol-rounded" onClick={toggleAiChat}>
          <Icon icon="mingcute:down-line" width="24" height="24" />
        </button>
      </div>

      <div ref={chatBodyRef} className="chat-body">
        <div className="message bot-message">
          <Icon icon="hugeicons:ai-chat-02" width="24" height="24" />
          <p className="message-text">
            Hey there
            <br /> How can I help you today?
          </p>
        </div>

        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </div>

      <div className="chat-footer">
        <form className="chat-form" onSubmit={handleFormSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="message-input"
            placeholder="Message..."
            required
          />
          <button>
            <Icon icon="fluent-mdl2:up" width="24" height="24" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AiChatbot;
