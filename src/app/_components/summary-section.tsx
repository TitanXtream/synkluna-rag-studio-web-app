import {
  DatabaseIcon,
  PanelLeftIcon,
  RefreshCcwIcon,
  TicketIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
} from "@/components";

export const SummarySection = () => {
  // Data for the thumbnail cards
  const thumbnailCards = [
    { id: 1, text: "Restructuring db data" },
    { id: 2, text: "Restructuring db data" },
    { id: 3, text: "Restructuring db data" },
    { id: 4, text: "Restructuring db data" },
    { id: 5, text: "Restructuring db data" },
  ];

  return (
    <div className="flex flex-col w-[300px] h-full items-start bg-[#090909]">
      {/* Header with logo and toggle */}
      <div className="flex h-[60px] items-center justify-between px-4 py-2 w-full">
        <div className="relative w-11 h-11">
          <div className="relative h-11">
            {/* <img
              className="absolute w-[29px] h-[39px] top-[3px] left-[15px]"
              alt="Subtract"
              src="/subtract.svg"
            />
            <img
              className="absolute w-8 h-11 top-0 left-0"
              alt="Vector"
              src="/vector.svg"
            /> */}
          </div>
        </div>

        <div className="flex w-11 h-11 items-center justify-center py-2.5">
          <PanelLeftIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col items-start gap-2.5 px-4 py-2 flex-1 w-full">
        {/* New char button */}
        <div className="flex h-[42px] items-center p-2 w-full rounded-2xl">
          <div className="inline-flex items-end gap-[9px]">
            <RefreshCcwIcon className="w-5 h-5" />
            <div className="font-medium text-[#d9d9d9] text-base">New char</div>
          </div>
        </div>

        {/* Thumbnails section */}
        <Card className="w-full bg-[#131313] border-none">
          <CardContent className="flex flex-wrap gap-[5px] p-2">
            {/* Drag and drop area */}
            <div className="relative w-64 h-[83px] rounded-lg overflow-hidden border-2 border-solid border-[#424551]">
              <div className="absolute top-[30px] left-[74px] font-normal text-[#6a6e7f] text-base text-center whitespace-nowrap">
                Drag and drop
              </div>
            </div>

            {/* XIcon button card */}
            <div className="relative w-[82px] h-[116px] bg-[#2f2f2f]">
              <div className="relative w-[22px] h-[22px] left-[60px] bg-[#d9d9d9]">
                <XIcon className="absolute w-5 h-5 top-px left-px" />
              </div>
            </div>

            {/* Thumbnail cards */}
            {thumbnailCards.map((card) => (
              <div key={card.id} className="relative w-[82px] h-[116px]">
                <div className="absolute w-[72px] h-[52px] top-1 left-[5px] bg-[#d9d9d9] rounded-[10px]" />
                <div className="absolute w-16 top-[62px] left-2 font-normal text-white text-xs text-center">
                  {card.text}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Store usage accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="store-usage" className="border-none">
            <AccordionTrigger className="flex h-[42px] items-center justify-between p-2 bg-[#42455180] rounded-2xl">
              <div className="inline-flex items-end gap-[9px]">
                <DatabaseIcon className="w-5 h-5" />
                <div className="font-medium text-[#d9d9d9] text-base">
                  Store usage
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-4 pr-0 py-0">
              <div className="flex flex-col items-start gap-[11px] w-full">
                <div className="font-medium text-white text-base mt-[-1.00px]">
                  Chunks: 200
                </div>
                <div className="font-medium text-white text-base">
                  Embeddings: 520
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Tokens usage accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="tokens-usage" className="border-none">
            <AccordionTrigger className="flex h-[42px] items-center justify-between p-2 bg-[#42455180] rounded-2xl">
              <div className="inline-flex items-end gap-[9px]">
                <TicketIcon className="w-5 h-5" />
                <div className="font-medium text-[#d9d9d9] text-base">
                  Tokens usage
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-4 pr-0 py-0">
              <div className="flex flex-col items-start gap-[11px] w-full">
                <div className="flex flex-col items-start justify-center w-full">
                  <div className="font-medium text-[#d9d9d9] text-base mt-[-1.00px]">
                    Prompt tokens: 25015
                  </div>
                  <div className="font-medium text-[#b3b3b3] text-xs">
                    (Tokens inputted to LLM)
                  </div>
                </div>

                <div className="flex flex-col items-start justify-center w-full">
                  <div className="font-medium text-[#d9d9d9] text-base mt-[-1.00px]">
                    Completion tokens: 15037
                  </div>
                  <div className="font-medium text-[#b3b3b3] text-xs">
                    (Tokens outputted from LLM)
                  </div>
                </div>

                <div className="font-medium text-[#d9d9d9] text-base">
                  Total token: 40052
                </div>

                <div className="font-medium text-[#d9d9d9] text-base w-full">
                  Total cost (USD): 0.00052
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* User profile footer */}
      <div className="flex h-[60px] items-center gap-2.5 px-4 py-2 w-full bg-[#1e1e1e]">
        <Avatar className="w-[46px] h-[46px] bg-[#d9d9d9] rounded-[23px]">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="relative h-full flex flex-col justify-center">
          <div className="font-normal text-[#d9d9d9] text-base whitespace-nowrap">
            John Dao
          </div>
          <div className="font-normal text-[#b3b3b3] text-xs">Beta</div>
        </div>
      </div>
    </div>
  );
};
