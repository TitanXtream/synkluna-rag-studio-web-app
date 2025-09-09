export type SynklunaLLMMessage =
  | {
      id: string;
      // role: "user" | "assistant";
      text: string;
    } & ({ role: "user" } | { role: "assistant"; isLoading: boolean });
