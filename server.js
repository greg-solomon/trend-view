import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import "./lib/cron";
import connectDB from "./lib/db/connect";
import bodyParser from "body-parser";
import path from "path";
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();

app.use(cors());

app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

connectDB();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use("/", express.static("client/build"));
  app.use("/trends/:id", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
