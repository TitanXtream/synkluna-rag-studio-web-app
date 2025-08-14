"use client";

import ChatContainer from "@/components/layout/basic-chat-layout/chat-container";
import QueryInput from "@/components/ui/query-input";

import ChatContextProvider2, {
  ChatContextConsumer2,
} from "@/utils/providers/chat-context-provider-2";

export default function Home() {
  // const { text, status, start } = useSSE();

  // const runQuery = (prompt: string) => {
  //   console.log("prompt started");
  //   if (!prompt.trim()) return;
  //   start("http://localhost:8000/stream", { prompt });
  // };
  return (
    <ChatContextProvider2>
      <ChatContextConsumer2>
        {(value) => (
          <>
            <div className="flex flex-col gap-0 max-h-screen items-stretch flex-1 overflow-auto">
              <ChatContainer
                messages={value?.messages ?? []}
                setSpanRef={value?.setSpanRef ?? (() => null)}
              />
            </div>
            <footer className="flex items-center justify-center h-[60px] px-4">
              <QueryInput onSubmit={value?.send ?? (() => {})} />
            </footer>
          </>
        )}
      </ChatContextConsumer2>
    </ChatContextProvider2>
    // <div>sv</div>

    // <ChatContextProvider>
    //   <ChatContextConsumer>
    //     {(value) => (
    //       <>
    //         <div className="flex flex-col gap-0 max-h-screen items-stretch flex-1 overflow-auto">
    //           <ChatContainer output={value?.text ?? ""} />
    //         </div>
    //         <footer className="flex items-center justify-center h-[60px] px-4">
    //           <QueryInput onSubmit={value?.runQuery ?? (() => {})} />
    //         </footer>
    //       </>
    //     )}
    //   </ChatContextConsumer>
    // </ChatContextProvider>
  );
}
