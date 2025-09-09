import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "flex items-center justify-center font-semibold duration-150 hover:scale-105 active:scale-95 focus:outline-none outline-none ring-0 disabled:opacity-50 disabled:pointer-events-none rounded-full cursor-pointer",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "border",
        text: "bg-transparent shadow-none",
        link: "px-0 py-0 hover:underline underline-offset-4 hover:scale-100 active:scale-100",
      },
      color: {
        primary:
          "bg-gradient-to-r from-primary1 to-primary2 text-white border-primary1",
        secondary: "text-white bg-gray-600 hover:bg-gray-700 border-gray-600",
        destructive: "text-white bg-red-600 hover:bg-red-700 border-red-600",
        constructive:
          "text-white bg-green-600 hover:bg-green-700 border-green-600",
      },
      size: {
        xs: "min-h-9 min-w-9",
        sm: "min-h-10 min-w-10",
        md: "min-h-14 min-w-14",
        lg: "min-h-18 min-w-18",
      },
    },
    compoundVariants: [
      {
        variant: "outlined",
        color: "primary",
        class:
          "bg-transparent text-primary1-400 hover:text-primary1-600 hover:bg-primary1-200",
      },
      {
        variant: "outlined",
        color: "secondary",
        class: "bg-transparent text-white hover:bg-gray-50",
      },
      {
        variant: "outlined",
        color: "destructive",
        class: "bg-transparent text-red-600 hover:bg-red-50",
      },
      {
        variant: "outlined",
        color: "constructive",
        class: "bg-transparent text-green-600 hover:bg-green-50",
      },
      {
        variant: "text",
        color: "primary",
        class:
          "text-primary1-400 bg-transparent hover:bg-gradient-to-r hover:from-primary1/20 hover:to-primary2/20",
      },
      {
        variant: "text",
        color: "secondary",
        class: "text-white bg-transparent hover:bg-gray-600/50",
      },
      {
        variant: "text",
        color: "destructive",
        class: "text-red-600 hover:underline",
      },
      {
        variant: "text",
        color: "constructive",
        class: "text-green-600 hover:underline",
      },
      {
        variant: "link",
        color: "primary",
        class: "p-0 bg-transparent text-primary1 hover:underline",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={twMerge(buttonVariants({ variant, color, size }), className)}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
