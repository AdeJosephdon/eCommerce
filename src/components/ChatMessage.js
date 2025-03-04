import { Icon } from "@iconify/react/dist/iconify.js";


function ChatMessage({chat}) {

  return (
    !chat.hideInChat && (
  <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message ${chat.isError ? "api-error" : ""}`}>

    {chat.role === "model" && <Icon icon="hugeicons:ai-chat-02" width="24" height="24" />}
      <p className="message-text">
        {chat.text}
      </p>
  </div>
    )

  );
}

export default ChatMessage;