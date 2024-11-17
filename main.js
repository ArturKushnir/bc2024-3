// main.js
const fs = require('fs');
const minimist = require('minimist');


const args = minimist(process.argv.slice(2));

// Перевірка наявності необхідних аргументів
if (!args.input || !args.output) {
  console.error("Будь ласка, вкажіть шляхи для --input і --output.");
  process.exit(1);
}


fs.readFile(args.input, 'utf8', (err, data) => {
  if (err) {
    console.error("Помилка при читанні файлу:", err);
    return;
  }

  try {
    
    const currencies = JSON.parse(data);

  
    const result = currencies.map(entry => `${entry.exchangedate}:${entry.rate}`).join('\n');

    
    fs.writeFile(args.output, result, 'utf8', (err) => {
      if (err) {
        console.error("Помилка при записі у файл:", err);
        return;
      }
      console.log("Дані успішно записані у файл:", args.output);

      // Якщо включено прапорець --display, вивести дані на екран
      if (args.display) {
        console.log("Вміст:\n", result);
      }
    });
  } catch (parseErr) {
    console.error("Помилка при обробці JSON:", parseErr);
  }
});
