interface ILenis {
  start(): void;
  stop(): void;
  scrollTo(target: string | number | HTMLElement, options?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    lenis?: ILenis;
  }
}

export {};
