export type ExplicitContentEntry = {
  content: Record<string, unknown>;
  adapter: string;
  sourceNote: string;
};

export type ExplicitContentMap = Record<string, ExplicitContentEntry>;

export const entry = (
  adapter: string,
  sourceNote: string,
  content: Record<string, unknown>
): ExplicitContentEntry => ({ adapter, sourceNote, content });

