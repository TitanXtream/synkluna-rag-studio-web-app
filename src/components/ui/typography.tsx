import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import React, { HTMLAttributes } from "react";

type TypographyVarients =
  | "heading1"
  | "heading2"
  | "heading3"
  | "body1"
  | "body2"
  | "body3"
  | "verySmall"
  | "helperText";

// const typographyVarients = cva('dgvxdzv', {
//   variants: {
//     variant: {
//       heading1: 'text-4xl font-bold text-gray-900',
//       heading2: 'text-2xl font-semibold leading-none tracking-tight',
//       heading3: 'text-xl font-semibold leading-none tracking-tight',
//       title: 'text-lg font-semibold leading-none tracking-tight',
//       subtitle: 'text-sm text-gray-500',
//       normal: '',
//       body1: 'text-lg text-gray-600',
//       body2: 'text-base text-gray-500',
//       body3: 'text-sm text-gray-500',
//     },
//   },
//   defaultVariants: {
//     variant: 'normal',
//   },
// });

export interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h4" | "h5" | "h6" | "p";
  variant?: TypographyVarients;
}

const Typography = ({
  as: Comp = "p",
  className,
  variant = "body1",
  children,
}: TypographyProps) => {
  const varientsMap: Record<TypographyVarients, string> = {
    heading1: "text-4xl font-bold leading-tight",
    heading2: "text-2xl font-bold",
    heading3: "text-xl font-semibold",
    body1: "text-xl",
    body2: "text-normal",
    body3: "text-sm",
    verySmall: "text-xs",
    helperText: "text-xs",
  };
  return (
    <Comp className={twMerge(varientsMap[variant], className)}>{children}</Comp>
  );
};

export default Typography;

export const SectionHeading = ({ children }: PropsWithChildren) => {
  return (
    <Typography variant="heading1" className="mb-12 text-center">
      {children}
    </Typography>
  );
};

export const BodyText2 = ({ children }: PropsWithChildren) => {
  return (
    <Typography variant="body2" className="text-gray-300">
      {children}
    </Typography>
  );
};

export const Highlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
      {children}
    </span>
  );
};
