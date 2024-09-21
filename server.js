const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement, getQuoteByPerson } = require("./utils");

const apiRouter = express.Router();
app.use("/api/quotes", apiRouter);

const PORT = process.env.PORT || 4001;

//middleware
app.use(express.static("public"));

apiRouter.get("/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

apiRouter.get("/", (req, res, next) => {
  const person = req.query.person;

  if (person) {
    const quotesByPerson = getQuoteByPerson(quotes, person);

    if (quotesByPerson.length > 0) {
      res.send({ quotes: quotesByPerson });
    } else {
      res
        .status(404)
        .send({ message: `Tidak ada kutipan yang ditemukan untuk ${person}` });
    }
  } else {
    res.send({ quotes });
  }
});

apiRouter.post("/", (req, res, next) => {
  const { quote, person } = req.query;

  if (!quote || !person) {
    return res
      .status(400)
      .send({ message: "Harap sertakan kutipan dan nama orang." });
  }
  const newQuote = { quote, person };
  quotes.push(newQuote);
  res.status(201).send({ quote: newQuote });
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
