import { paymentRouter } from "./router/payment";
import { settlementRouter } from "./router/settlement";
import { templateRouter } from "./router/template";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  template: templateRouter,
  payment: paymentRouter,
  settlement: settlementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
