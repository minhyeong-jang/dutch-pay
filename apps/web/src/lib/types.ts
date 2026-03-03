import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@naran/api";

type RouterOutput = inferRouterOutputs<AppRouter>;

/** template.byId 응답 타입 */
export type Template = NonNullable<RouterOutput["template"]["byId"]>;

/** DB Participant 타입 */
export type Participant = Template["participants"][number];

/** DB Payment 타입 (with participants 관계 포함) */
export type Payment = Template["payments"][number];

/** template.list 응답의 개별 아이템 */
export type TemplateListItem = RouterOutput["template"]["list"][number];

/** settlement.calculate 응답 */
export type SettlementResult = NonNullable<
  RouterOutput["settlement"]["calculate"]
>;
