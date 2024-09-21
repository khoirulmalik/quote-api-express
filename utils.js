const getRandomElement = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Expected an array");
  return arr[Math.floor(Math.random() * arr.length)];
};

const getQuoteByPerson = (arr, personName) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].person.toLowerCase() === personName.toLowerCase()) {
      result.push(arr[i]);
    }
  }

  return result;
};

module.exports = {
  getRandomElement,
  getQuoteByPerson,
};
