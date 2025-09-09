import { MenuItem, Typography } from "@/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import { ChevronDownIcon, DatabaseIcon, TicketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import DocumentDropzone from "./document-dropzon";
import AccordianParametersMenuItem from "./accordian-parameters-menu-item";

const SideBarContent = () => {
  // const thumbnailCards = [
  //   { id: 1, text: "Restructuring db data" },
  //   { id: 2, text: "Restructuring db data" },
  //   { id: 3, text: "Restructuring db data" },
  //   { id: 4, text: "Restructuring db data" },
  //   { id: 5, text: "Restructuring db data" },
  // ];

  return (
    <>
      <div className="flex flex-col items-stretch px-[var(--synkluna-rag-padding-x)] py-2 w-full">
        {/* New char button */}
        <Link href={"/"} target="_parent">
          <MenuItem className="text-sm">
            <p>New char</p>
          </MenuItem>
        </Link>

        <DocumentDropzone />

        {/* Store usage accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value="store-usage" className="border-none w-full">
            <AccordionTrigger className="w-full group">
              <MenuItem className="flex items-center justify-between w-full text-sm">
                <div className="inline-flex items-end gap-[9px]">
                  <DatabaseIcon className="size-4" />
                  <div className="">Store usage</div>
                </div>
                <ChevronDownIcon className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 text-primary1" />
              </MenuItem>
            </AccordionTrigger>
            <AccordionContent className="pl-4 pr-0 pb-2 text-white">
              <div className="flex flex-col items-start gap-[0.5rem] w-full">
                <AccordianParametersMenuItem label="Chunks" value="200" />
                <AccordianParametersMenuItem label="Embeddings" value="520" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Tokens usage accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value="tokens-usage" className="border-none w-full">
            <AccordionTrigger className="w-full group">
              <MenuItem className="flex items-center justify-between w-full text-sm">
                <div className="inline-flex items-end gap-[9px]">
                  <TicketIcon className="size-4" />
                  <Typography variant="body2">Tokens usage</Typography>
                </div>
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-primary1  transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </MenuItem>
            </AccordionTrigger>
            <AccordionContent className="pl-4 pr-0 pb-2">
              <div className="flex flex-col items-start gap-[0.5rem] w-full">
                <AccordianParametersMenuItem
                  label="Prompt tokens"
                  value="25015"
                  helperText="Tokens inputted to LLM"
                />
                <AccordianParametersMenuItem
                  label="Completion tokens"
                  value="15037"
                  helperText="Tokens outputted from LLM"
                />
                <AccordianParametersMenuItem
                  label="Total token"
                  value="40052"
                  helperText="Total tokens used"
                />
                <AccordianParametersMenuItem
                  label="Total cost (USD)"
                  value="0.00052"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default SideBarContent;
