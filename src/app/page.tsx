import ChatContainer from "@/components/chat-container";
import QueryInput from "@/components/ui/query-input";

import ChatContextProvider, {
  ChatContextConsumer,
} from "@/utils/providers/chat-context-provider";

export default function Home() {
  return (
    <ChatContextProvider>
      <>
        <div className="flex flex-col gap-0 max-h-screen items-stretch flex-1 overflow-auto">
          <ChatContainer />
        </div>
        <footer className="flex items-center justify-center h-[60px] px-4">
          <QueryInput />
        </footer>
      </>
    </ChatContextProvider>
  );
}
