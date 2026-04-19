import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 255 }),
  email: text(),
  avatarUrl: text(),
  googleOauthId: text(),
  isShadowBanned: boolean().default(false),
  deviceId: text(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull()
});

export const userSessionTable = pgTable("session", {
    sessionToken: text().notNull().primaryKey(),
    userId: uuid().notNull().references(() => userTable.id),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull()
})

export const amaTable = pgTable("ama", {
    id: uuid().primaryKey().defaultRandom(),
    title: text(),
    link: varchar({ length: 255 }),
    ownerId: uuid().references(() => userTable.id)
})

export const questionTable = pgTable("question", {
  id: uuid().primaryKey().defaultRandom(),
  questionContent: text(),
  isSpam: boolean().default(false),
  askedBy: uuid().references(() => userTable.id), 
  amaId: uuid().references(() => amaTable.id),
});

export const userRelations = relations(userTable, ({many}) => ({
    amas: many(amaTable),
    questionsAsked: many(questionTable),
    session: many(userSessionTable)
}))

export const sessionRelations = relations(userSessionTable, ({one}) => ({
    user: one(userTable, {
        fields: [userSessionTable.userId],
        references: [userTable.id]
    })
}))

export const amaRelations = relations(amaTable, ({one, many}) => ({
    owner: one(userTable, {
        fields:[amaTable.ownerId],
        references: [userTable.id]
    }),
    questions: many(questionTable)
}))

export const questionRelations = relations(questionTable, ({one}) => ({
    askedByUser: one(userTable, {
        fields: [questionTable.askedBy],
        references: [userTable.id]
    }),
    ama: one(amaTable, {
        fields: [questionTable.amaId],
        references: [amaTable.id]
    })
}))

export type User = InferSelectModel<typeof userTable>
export type NewUser = InferInsertModel<typeof userTable>
export type Session = InferInsertModel<typeof userSessionTable>


