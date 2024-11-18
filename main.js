const fs = require('fs');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
  alias: {
    i: 'input',
    o: 'output',
    d: 'display'
  },
});

// Перевірка обов'язкового параметра input
if (!args.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// Перевірка існування файлу
if (!fs.existsSync(args.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// Зчитування файлу
fs.readFile(args.input, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading the file:", err.message);
    process.exit(1);
  }

  try {
    // Розбір JSON
    const currencies = JSON.parse(data);

    // Перевірка структури JSON
    if (!Array.isArray(currencies) || !currencies.every(entry => entry.exchangedate && entry.rate)) {
      console.error("Invalid JSON structure. Expected an array of objects with 'exchangedate' and 'rate' fields.");
      process.exit(1);
    }

    // Формування результату
    const result = currencies.map(entry => `${entry.exchangedate}:${entry.rate}`).join('\n');

    // Запис у файл (якщо задано параметр --output)
    if (args.output) {
      fs.writeFile(args.output, result, 'utf8', (err) => {
        if (err) {
          console.error("Error writing to file:", err.message);
        } else {
          console.log(`Result successfully written to file: ${args.output}`);
        }
      });
    }

    // Виведення в консоль (якщо задано параметр --display)
    if (args.display) {
      console.log("Result:\n", result);
    }
  } catch (parseErr) {
    console.error("Error processing JSON:", parseErr.message);
    process.exit(1);
  }
});

// Якщо жодного необов'язкового параметра не задано, програма нічого не робить
if (!args.output && !args.display) {
  process.exit(0);
}
