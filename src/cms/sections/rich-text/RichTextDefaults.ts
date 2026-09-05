import type { RichTextSectionData } from "../types";

export const richTextDefaults: RichTextSectionData = {
  content: {
    type: "doc",
    content: [{ type: "paragraph" }],
  },
};
