import Chat from "@/components/chat-input";
import ChatContainer2 from "@/components/layout/basic-chat-layout/chat-container-2";

export default function Home() {
  // const { text, status, start } = useSSE();

  // const runQuery = (prompt: string) => {
  //   console.log("prompt started");
  //   if (!prompt.trim()) return;
  //   start("http://localhost:8000/stream", { prompt });
  // };
  return (
    // <div className="bg-transparent flex justify-center w-full">
    //   <div className="[background:radial-gradient(50%_50%_at_31%_27%,rgba(24,39,57,1)_0%,rgba(23,9,9,1)_100%)] w-full min-h-screen flex">
    //     <SummarySection />
    //     <CoverageSection />
    //   </div>
    // </div>
    <div className="text-white">
      {/* <ChatContainer2 /> */}
      <Chat />
    </div>
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
