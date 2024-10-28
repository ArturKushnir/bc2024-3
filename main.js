const { program } = require('commander');
const fs = require('fs');

// Налаштування аргументів командного рядка
program
  .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису результату')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

// Отримання параметрів
const options = program.opts();

// Перевірка наявності вхідного файлу
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Читання вхідного файлу
fs.access(options.input, fs.constants.F_OK, (err) => {
  if (err) {
    console.error('Cannot find input file');
    process.exit(1);
  }

  // Зчитування вмісту файлу
  fs.readFile(options.input, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading input file');
      process.exit(1);
    }

    // Обробка даних (тут ви можете додати свою логіку)
    const jsonData = JSON.parse(data);
    const result = JSON.stringify(jsonData, null, 2); // Форматування JSON

    // Вивід результату
    if (options.display) {
      console.log(result);
    }

    // Запис результату у файл, якщо задано
    if (options.output) {
      fs.writeFile(options.output, result, (err) => {
        if (err) {
          console.error('Error writing to output file');
          process.exit(1);
        }
        console.log(`Результат записано в файл: ${options.output}`);
      });
    }
  });
});
