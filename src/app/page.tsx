import Image from "next/image";
import { CoverageSection } from "./_components/coverage-section";
import { SummarySection } from "./_components/summary-section";
import QueryInput from "@/components/layout/basic-chat-layout/query-input";
import ChatContainer from "@/components/layout/basic-chat-layout/chat-container";

export default function Home() {
  return (
    // <div className="bg-transparent flex justify-center w-full">
    //   <div className="[background:radial-gradient(50%_50%_at_31%_27%,rgba(24,39,57,1)_0%,rgba(23,9,9,1)_100%)] w-full min-h-screen flex">
    //     <SummarySection />
    //     <CoverageSection />
    //   </div>
    // </div>
    <>
      <div className="flex flex-col gap-0 max-h-screen items-stretch flex-1 overflow-auto">
        <ChatContainer />
      </div>
      <footer className="flex items-center justify-center h-[60px] px-4">
        <QueryInput />
      </footer>
    </>
  );
}
