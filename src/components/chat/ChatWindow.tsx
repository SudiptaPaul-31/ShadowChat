import ChatHeader from "./chatWindow/ChatHeader";
import MessageArea from "./chatWindow/MessageArea";
import MessageInput from "./chatWindow/MessageInput";
import { Profile } from "@/lib/types";

const ChatWindow: React.FC<{ activeProfile?: Profile }> = ({ activeProfile }) => (
    <div className="flex-1 flex flex-col">
      <ChatHeader profile={activeProfile} />
      <MessageArea />
      <MessageInput />
    </div>
  );

  export default ChatWindow;