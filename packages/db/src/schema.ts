import { relations, sql } from "drizzle-orm";
import { pgTable, primaryKey } from "drizzle-orm/pg-core";

// ─── Templates (모임 단위) ───────────────────────────────

export const templates = pgTable("templates", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  userId: t.uuid("user_id"),
  name: t.text().notNull().default("New Template"),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: t
    .timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => sql`now()`),
}));

export const templatesRelations = relations(templates, ({ many }) => ({
  participants: many(participants),
  payments: many(payments),
  sharedLinks: many(sharedLinks),
}));

// ─── Participants (참가자) ───────────────────────────────

export const participants = pgTable("participants", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  templateId: t
    .uuid("template_id")
    .notNull()
    .references(() => templates.id, { onDelete: "cascade" }),
  name: t.text().notNull(),
  tagColor: t.text("tag_color").notNull(),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow(),
}));

export const participantsRelations = relations(
  participants,
  ({ one, many }) => ({
    template: one(templates, {
      fields: [participants.templateId],
      references: [templates.id],
    }),
    payerOf: many(payments),
    participantIn: many(paymentParticipants),
  }),
);

// ─── Payments (결제 건) ──────────────────────────────────

export const payments = pgTable("payments", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  templateId: t
    .uuid("template_id")
    .notNull()
    .references(() => templates.id, { onDelete: "cascade" }),
  title: t.text().notNull(),
  amount: t.integer().notNull(),
  payerId: t
    .uuid("payer_id")
    .references(() => participants.id),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow(),
}));

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  template: one(templates, {
    fields: [payments.templateId],
    references: [templates.id],
  }),
  payer: one(participants, {
    fields: [payments.payerId],
    references: [participants.id],
  }),
  participants: many(paymentParticipants),
}));

// ─── Payment Participants (다대다 관계) ──────────────────

export const paymentParticipants = pgTable(
  "payment_participants",
  (t) => ({
    paymentId: t
      .uuid("payment_id")
      .notNull()
      .references(() => payments.id, { onDelete: "cascade" }),
    participantId: t
      .uuid("participant_id")
      .notNull()
      .references(() => participants.id, { onDelete: "cascade" }),
  }),
  (table) => [primaryKey({ columns: [table.paymentId, table.participantId] })],
);

export const paymentParticipantsRelations = relations(
  paymentParticipants,
  ({ one }) => ({
    payment: one(payments, {
      fields: [paymentParticipants.paymentId],
      references: [payments.id],
    }),
    participant: one(participants, {
      fields: [paymentParticipants.participantId],
      references: [participants.id],
    }),
  }),
);

// ─── Shared Links (공유 링크) ────────────────────────────

export const sharedLinks = pgTable("shared_links", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  templateId: t
    .uuid("template_id")
    .notNull()
    .references(() => templates.id, { onDelete: "cascade" }),
  token: t.text().notNull().unique(),
  isReadonly: t.boolean("is_readonly").default(true),
  expiresAt: t.timestamp("expires_at", { withTimezone: true }),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow(),
}));

export const sharedLinksRelations = relations(sharedLinks, ({ one }) => ({
  template: one(templates, {
    fields: [sharedLinks.templateId],
    references: [templates.id],
  }),
}));
