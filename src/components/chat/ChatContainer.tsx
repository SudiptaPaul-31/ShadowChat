import React from 'react';

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Chat header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold">Chat</h1>
      </div>

      {/* Message list area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages will go here */}
      </div>

      {/* Message input area */}
      <div className="p-4 border-t border-border">
        {/* Input and send button will go here */}
      </div>
    </div>
  );
};

export default ChatContainer; 