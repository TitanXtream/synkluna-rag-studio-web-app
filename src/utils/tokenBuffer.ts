export type Listener = (flushText: string) => void;

export class TokenBuffer {
  private buf: string[] = [];
  private scheduled = false;
  private listeners = new Set<Listener>();

  append(token: string) {
    this.buf.push(token);
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => {
        this.scheduled = false;
        if (this.buf.length === 0) return;
        const out = this.buf.join("");
        this.buf.length = 0;
        this.listeners.forEach((l) => l(out));
      });
    }
  }

  onFlush(l: Listener) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
}
