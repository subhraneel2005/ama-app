import { relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 255 }),
  isShadowBanned: boolean().default(false),
  deviceId: text(),
});

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
    questionsAsked: many(questionTable)
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


