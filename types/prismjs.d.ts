declare module "prismjs" {
  export function highlight(
    text: string,
    grammar: Record<string, unknown>,
    language: string
  ): string;
  export const languages: Record<string, Record<string, unknown>>;
  export const util: { clone<T>(obj: T): T };
}
