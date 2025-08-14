import React from "react";

const ChatContainer = () => {
  const messages = [
    {
      id: 1,
      role: "user",
      content: "Hey there, can you help me with my JavaScript code?",
    },
    {
      id: 2,
      role: "assistant",
      content: "Of course! What seems to be the issue?",
    },
    {
      id: 3,
      role: "user",
      content:
        "I'm trying to loop through an array of numbers and find the sum, but it's not working as expected.",
    },
    {
      id: 4,
      role: "assistant",
      content: "Could you share your code so I can take a look?",
    },
    {
      id: 5,
      role: "user",
      content:
        "Sure: `let sum = 0; for (let i in arr) { sum += arr[i]; }` but I’m getting NaN.",
    },
    {
      id: 6,
      role: "assistant",
      content:
        "It might be because `arr` isn’t defined or has non-numeric values. Can you log it out?",
    },
    { id: 7, role: "user", content: "The array is `[1, 2, '3', 4]`." },
    {
      id: 8,
      role: "assistant",
      content:
        "Ah, the string `'3'` is causing an implicit type issue. You can parse it: `sum += Number(arr[i]);`.",
    },
    {
      id: 9,
      role: "user",
      content: "Makes sense. Now I get 10 instead of NaN. Thanks!",
    },
    {
      id: 10,
      role: "assistant",
      content: "Great! Anything else you need help with?",
    },
    {
      id: 11,
      role: "user",
      content:
        "Yes, I'm also learning about async/await. Can you give me a quick example?",
    },
    {
      id: 12,
      role: "assistant",
      content:
        "Sure! Example: `async function getData() { const res = await fetch('/api'); const data = await res.json(); console.log(data); }`",
    },
    {
      id: 13,
      role: "user",
      content: "So `await` pauses execution until the promise resolves?",
    },
    {
      id: 14,
      role: "assistant",
      content:
        "Exactly. It lets you write asynchronous code that looks synchronous.",
    },
    {
      id: 15,
      role: "user",
      content: "Cool. Can I use it outside of a function?",
    },
    {
      id: 16,
      role: "assistant",
      content:
        "In modern JavaScript (ES2022+), you can use top-level await in modules, but not in older environments.",
    },
    {
      id: 17,
      role: "user",
      content:
        "Got it. Oh, and I also need a quick intro to array methods like map, filter, reduce.",
    },
    {
      id: 18,
      role: "assistant",
      content:
        "`map` transforms each element, `filter` keeps elements based on a condition, `reduce` accumulates values into one result.",
    },
    {
      id: 19,
      role: "user",
      content: "Can you give me an example using all three?",
    },
    {
      id: 20,
      role: "assistant",
      content:
        "`[1,2,3,4].map(n=>n*2).filter(n=>n>4).reduce((a,b)=>a+b,0)` → maps to `[2,4,6,8]`, filters to `[6,8]`, reduces to `14`.",
    },
    { id: 21, role: "user", content: "Perfect, I understand now." },
    {
      id: 22,
      role: "assistant",
      content:
        "Glad to hear that! Do you want me to prepare a practice set for you?",
    },
    { id: 23, role: "user", content: "Yes, please. That would be great." },
    {
      id: 24,
      role: "assistant",
      content:
        "Alright, I'll make 10 exercises for array manipulation, async/await, and object handling.",
    },
    { id: 25, role: "user", content: "Thanks a ton!" },
    {
      id: 26,
      role: "assistant",
      content: "You're welcome! Let's keep coding 🚀",
    },
  ];

  return (
    <ul className="p-4 text-white mx-auto w-full max-w-[var(--synkluna-query-chat-system-width)] pb-[var(--synkluna-chat-container-bottom-padding)] flex flex-col gap-[var(--synkluna-chat-container-message-gap)]">
      {messages.map((message) => (
        <li
          key={message.id}
          data-role={message.role}
          className="data-[role=user]:flex data-[role=user]:justify-end group"
        >
          <div className="group-data-[role=user]:bg-neutral-900 p-4 max-w-[var(--synkluna-chat-container-user-message-max-width)] rounded-[var(--synkluna-chat-container-user-message-radius)]">
            <p>{message.content}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatContainer;
