import express from "express";
import cache from "./cache.mjs";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// get the list of books
app.get("/reading-list/books", (_, res) => {
  const keys = cache.keys();
  const allData = {};
  for (const key of keys) {
    allData[key] = cache.get(key);
  }
//   setTimeout(() => {
//     res.json({ message: 'This response was delayed by 3 seconds!' });
// }, 12000);
console.log("log 1")
const dataPromise = new Promise((resolve) => {
  // Simulate a delay in fetching data (you can remove this if unnecessary)
  setTimeout(() => {
    allData;
  }, 100000); // Simulate a delay of 1 second for data fetching
});
console.log("log 2")
return Promise.resolve(dataPromise);
});


// health check
app.get("/reading-list/healthz", (_, res) => {
  return res.sendStatus(200);
});

app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500);
  res.json({ error: err.message });
});

app.use("*", (_, res) => {
  return res
    .status(404)
    .json({ error: "the requested resource does not exist on this server" });
});

export default app;
