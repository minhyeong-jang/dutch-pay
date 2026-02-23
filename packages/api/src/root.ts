import { participantRouter } from "./router/participant";
import { paymentRouter } from "./router/payment";
import { settlementRouter } from "./router/settlement";
import { sharedLinkRouter } from "./router/shared-link";
import { templateRouter } from "./router/template";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  template: templateRouter,
  payment: paymentRouter,
  settlement: settlementRouter,
  participant: participantRouter,
  sharedLink: sharedLinkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
