import { Smile, Paperclip } from "lucide-react";
import SendGradient from "./SendGradient";

const MessageInput: React.FC = () => (
  <div className="bg-[#120C22] px-2 sm:px-6 py-3 sm:py-4 border-t border-gray-700">
    <div className="flex items-center space-x-2 sm:space-x-4">
      <button className="text-gray-400 hover:text-white transition-colors">
        <Paperclip className="w-5 h-5" />
      </button>
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-3 sm:px-4 py-2 bg-[#241745] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
          <Smile className="w-5 h-5" />
        </button>
      </div>
      <button className="w-5 h-5">
        <SendGradient className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default MessageInput;
