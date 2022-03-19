import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
// import { Student } from './entities/Student';
import { ContactResolver } from './resolvers/contact';
import { StudentResolver } from './resolvers/student';
import { SubscribeResolver } from './resolvers/subscribe';

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

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax',
      },
      saveUninitialized: false,
      secret: 'asdflkelansdglksandflkskasdflkasd',
      resave: false,
    })
  );

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // development logging
  app.get('/', (_, res) => {
    res.status(200).send('Welcome to the home page');
  });

  app.get('*', (req, res) => {
    res.send(`Cannot find ${req.originalUrl} on this server`);
    console.log(req.originalUrl);
  });

  let PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log('App running on port', PORT);
    console.log('to Access the app...');
    console.log(`Go to http://localhost:${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
