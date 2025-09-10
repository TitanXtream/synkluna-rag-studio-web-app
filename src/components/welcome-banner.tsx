import { Typography } from "@/components";

const WelcomeBanner = () => {
  return (
    <div className="w-full max-w-[var(--synkluna-query-chat-system-width)] mx-auto flex flex-col gap-4 items-stretch px-4 pb-20 text-white text-center">
      <Typography variant="heading1" className="text-4xl">
        Welcome to RAG Studio.
      </Typography>
      <Typography variant="body1">
        Build, test, and deploy Retrieval-Augmented Generation (RAG) workflows.
      </Typography>
    </div>
  );
};

export default WelcomeBanner;
