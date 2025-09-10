import ChatContainer from "@/components/chat-container";
import QueryInput from "@/components/ui/query-input";

import ChatContextProvider from "@/utils/providers/chat-context-provider";

export default function Home() {
  return (
    <ChatContextProvider>
      <>
        <ChatContainer />

        <footer className="flex items-center justify-center h-[60px] px-4">
          <QueryInput />
        </footer>
      </>
    </ChatContextProvider>
  );
}
