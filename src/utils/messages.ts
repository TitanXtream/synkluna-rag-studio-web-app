export type Role = "user" | "assistant" | "system";

export type Message =
  | { id: string; role: "user"; content: string; createdAt: number }
  | {
      id: string;
      role: "assistant";
      content: string;
      createdAt: number;
      streaming?: boolean;
    };

export const makeId = () => crypto.randomUUID?.() ?? String(Date.now());

export function makeUser(text: string): Message {
  return { id: makeId(), role: "user", content: text, createdAt: Date.now() };
}
export function startAssistant(): Message {
  return {
    id: makeId(),
    role: "assistant",
    content: "",
    createdAt: Date.now(),
    streaming: true,
  };
}

type Action =
  | { type: "ADD_USER"; text: string }
  | { type: "START_ASSIST" }
  | { type: "COMMIT_APPEND"; id: string; chunk: string }
  | { type: "END"; id: string };

export function messagesReducer(state: Message[], action: Action): Message[] {
  switch (action.type) {
    case "ADD_USER":
      return [...state, makeUser(action.text)];
    case "START_ASSIST":
      return [...state, startAssistant()];
    case "COMMIT_APPEND":
      return state.map((m) =>
        m.id === action.id ? { ...m, content: m.content + action.chunk } : m
      );
    case "END":
      return state.map((m) =>
        m.id === action.id ? { ...m, streaming: false } : m
      );
  }
}
