import { initTRPC } from "@trpc/server";
import { Problem } from "../models/task";

const t = initTRPC.create();

let problems = [
  {
    id: 0,
    title: "Polyfill of Array.map",
    description: "Some description",
  },
  {
    id: 1,
    title: "Polyfill of Promise.all()",
    description: "Some description",
  },
];

export const router = t.router;
export const publicProcedure = t.procedure;

// Create tRPC router

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
  getAllProblems: publicProcedure.query(() => problems),
  updateProblems: publicProcedure
    .input((v) => {
      if (typeof v !== "object")
        throw new Error(`Object expected received ${typeof v}`);
      return v;
    })
    .mutation(async (opts) => {
      const data = opts.input as unknown as Problem;
      problems = problems.map((p) => {
        if (p.id == data.id) {
          return { ...p, ...data };
        }
        return p;
      });
    }),
});

export type AppRouter = typeof appRouter;
