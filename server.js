const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const apiRouter = express.Router();
app.use("/api/quotes", apiRouter);

const PORT = process.env.PORT || 4001;

//middleware
app.use(express.static("public"));

apiRouter.get("/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote.quote });
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
