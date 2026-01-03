import { z } from "zod";

export const scheme = z.object({
  text: z.string().min(1).max(100),
});