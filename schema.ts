import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 255 }),
  email: text(),
  avatarUrl: text(),
  googleOauthId: text(),
  isShadowBanned: boolean().default(false),
  IsBanned: boolean().default(false),
  abuseCount: integer().default(0),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const userSessionTable = pgTable("session", {
  sessionToken: text().notNull().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const amaTable = pgTable("ama", {
  id: uuid().primaryKey().defaultRandom(),
  publicId: varchar({ length: 8 }).notNull().unique(),
  title: text(),
  link: varchar({ length: 255 }),
  ownerId: uuid().references(() => userTable.id),
});

export const moderationEnum = pgEnum("moderationCategory", [
  "TOXIC",
  "HARASSMENT",
  "HATE",
  "SEXUAL",
  "THREAT",
  "VIOLENCE",
  "SPAM",
  "SELF_HARM",
  "SAFE",
]);

export const questionTable = pgTable("question", {
  id: uuid().primaryKey().defaultRandom(),
  questionContent: text(),

  scores: jsonb()
    .$type<{
      TOXIC: number;
      HARASSMENT: number;
      HATE: number;
      SEXUAL: number;
      THREAT: number;
      VIOLENCE: number;
      SPAM: number;
      SELF_HARM: number;
      SAFE: number;
    }>()
    .default({
      TOXIC: 0,
      HARASSMENT: 0,
      HATE: 0,
      SEXUAL: 0,
      THREAT: 0,
      VIOLENCE: 0,
      SPAM: 0,
      SELF_HARM: 0,
      SAFE: 0,
    }),
  moderationCat: moderationEnum().default("SAFE"),

  isSpam: boolean().default(false),
  isAbuse: boolean().default(false),
  actorId: uuid().references(() => actorTable.id),
  amaId: uuid().references(() => amaTable.id),

  createdAt: timestamp({ withTimezone: true }).defaultNow()
});

export const actorTable = pgTable("actor", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => userTable.id),
  anonId: varchar({ length: 64 }),
  ipHash: varchar({ length: 128 }),
  deviceID: text(),

  abuseCount: integer().default(0),
  reportCount: integer().default(0),
  isBanned: boolean().default(false),

  lastMessagedAt: timestamp({ withTimezone: true }),
  createdAt: timestamp({ withTimezone: true }).defaultNow()
})

export const userRelations = relations(userTable, ({ many }) => ({
  amas: many(amaTable),
  questionsAsked: many(questionTable),
  session: many(userSessionTable),
}));

export const sessionRelations = relations(userSessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userSessionTable.userId],
    references: [userTable.id],
  }),
}));

export const amaRelations = relations(amaTable, ({ one, many }) => ({
  owner: one(userTable, {
    fields: [amaTable.ownerId],
    references: [userTable.id],
  }),
  questions: many(questionTable),
}));

export const questionRelations = relations(questionTable, ({ one }) => ({
  actorId: one(actorTable, {
    fields: [questionTable.actorId],
    references: [actorTable.id],
  }),
  ama: one(amaTable, {
    fields: [questionTable.amaId],
    references: [amaTable.id],
  }),
}));

export type Moderation = (typeof moderationEnum.enumValues)[number];

export type User = InferSelectModel<typeof userTable>;
export type NewUser = InferInsertModel<typeof userTable>;

export type Session = InferInsertModel<typeof userSessionTable>;

export type NewAma = InferInsertModel<typeof amaTable>
export type Ama = InferSelectModel<typeof amaTable>

export type NewActor = InferInsertModel<typeof actorTable>
export type Actor = InferSelectModel<typeof actorTable>

export type NewQuestion = InferInsertModel<typeof questionTable>
export type Question = InferSelectModel<typeof questionTable>