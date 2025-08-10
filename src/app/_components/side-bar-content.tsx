import { MenuItem } from "@/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import { ChevronDownIcon, DatabaseIcon, TicketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SideBarContent = () => {
  const thumbnailCards = [
    { id: 1, text: "Restructuring db data" },
    { id: 2, text: "Restructuring db data" },
    { id: 3, text: "Restructuring db data" },
    { id: 4, text: "Restructuring db data" },
    { id: 5, text: "Restructuring db data" },
  ];

  return (
    <>
      <div className="flex flex-col items-stretch px-4 py-2 w-full">
        {/* New char button */}
        <Link href={"/"} target="_parent">
          <MenuItem>
            <p>New char</p>
          </MenuItem>
        </Link>

        {/* Store usage accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value="store-usage" className="border-none w-full">
            <AccordionTrigger className="w-full group">
              <MenuItem className="flex items-center justify-between w-full">
                <div className="inline-flex items-end gap-[9px]">
                  <DatabaseIcon className="w-5 h-5" />
                  <div className="font-medium text-[#d9d9d9] text-base">
                    Store usage
                  </div>
                </div>
                <ChevronDownIcon className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 text-primary" />
              </MenuItem>
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
        <Accordion type="single" collapsible>
          <AccordionItem value="tokens-usage" className="border-none w-full">
            <AccordionTrigger className="w-full group">
              <MenuItem className="flex items-center justify-between w-full">
                <div className="inline-flex items-end gap-[9px]">
                  <TicketIcon className="w-5 h-5" />
                  <div className="font-medium text-[#d9d9d9] text-base">
                    Tokens usage
                  </div>
                </div>
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </MenuItem>
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
    </>
  );
};

export default SideBarContent;
