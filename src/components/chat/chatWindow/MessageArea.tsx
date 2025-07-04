const MessageArea: React.FC = () => (
  <div className="flex-1 bg-blue-600 flex items-center justify-center px-2 sm:px-4">
    <div className="text-center">
      <div className="text-white text-4xl sm:text-6xl mb-2 sm:mb-4">💬</div>
      <h3 className="text-white text-lg sm:text-xl font-medium mb-1 sm:mb-2">
        Start a conversation
      </h3>
      <p className="text-blue-100 text-xs sm:text-base">
        Select a chat to start messaging
      </p>
    </div>
  </div>
);

export default MessageArea;
