import { makeUser, Message, startAssistant } from "@/utils/messages";

// reducer.ts
type Action =
  | { type: "ADD_USER"; text: string }
  | { type: "START_ASSIST" }
  | { type: "COMMIT_APPEND"; id: string; chunk: string }
  | { type: "END"; id: string };

export function reducer(state: Message[], action: Action): Message[] {
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
