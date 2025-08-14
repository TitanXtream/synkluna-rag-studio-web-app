// // MessagesList.tsx
// import { Message } from "@/utils/messages";
// import { Virtuoso } from "react-virtuoso";
// import { DraftMessage } from "./DraftMessage";
// import { RichMessage } from "./rich-message";

// export function MessagesList({ items }: { items: Message[] }) {
//   return (
//     <Virtuoso
//       data={items}
//       itemContent={(index, m) =>
//         m.role === "assistant" && m.streaming ? (
//           <DraftMessage
//             initial={m.content}
//             onCommit={(chunk) => {
//               /* optional: also debounce analytics */
//             }}
//           />
//         ) : (
//           <RichMessage md={m.content} />
//         )
//       }
//       followOutput="smooth"
//     />
//   );
// }
