export class SynklunaMessage<R extends "user" | "assistant"> {
  readonly id: string = Date.now().toString();

  constructor(
    public readonly role: R,
    public readonly content: R extends "assistant"
      ? Readonly<React.ReactNode>
      : React.ReactNode
  ) {}
}

export type SynklunaMessageType = InstanceType<typeof SynklunaMessage>;
