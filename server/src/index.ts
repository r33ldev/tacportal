import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ContactResolver } from "./resolvers/contact";
import { StudentResolver } from "./resolvers/student";
import { SubscribeResolver } from "./resolvers/subscribe";

const main = async () => {
  // let conn = await createConnection();
   await createConnection();
  // await conn.runMigrations();
  // await Student.delete({});
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ContactResolver, StudentResolver, SubscribeResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // development logging
  app.use(morgan("dev"));

  app.get("/", (_, res) => {
    res.status(200).send("Welcome to the home page");
  });

  app.get("*", (req, res) => {
    res.send(`Cannot find ${req.originalUrl} on this server`);
    console.log(req.originalUrl);
  });

  let PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log("App running on port", PORT);
    console.log("to Access the app...");
    console.log(`Go to http://localhost:${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
