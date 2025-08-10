import { Typography } from "@/components";
import React from "react";

const AccordianParametersMenuItem = ({
  label,
  value = "0",
  helperText,
}: {
  label: string;
  value: string;
  helperText?: string;
}) => {
  return (
    <div className="flex flex-col items-start justify-center w-full">
      {/* <div className="font-medium text-white text-xs">
        {label}: {value}
      </div> */}
      <Typography variant="verySmall" className="text-white">
        {label}: {value}
      </Typography>
      {helperText && (
        <Typography variant="helperText" className="text-gray-400">
          ({helperText})
        </Typography>
      )}
    </div>
  );
};

export default AccordianParametersMenuItem;
