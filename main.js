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
try {
  fs.accessSync(options.input, fs.constants.F_OK);
} catch (err) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Зчитування вмісту файлу
let jsonData;
try {
  const data = fs.readFileSync(options.input, 'utf8');
  jsonData = JSON.parse(data);
} catch (err) {
  console.error('Error reading input file');
  process.exit(1);
}

// Обробка даних
const result = jsonData; // або обробка за вашим варіантом

// Вивід результату
if (options.display) {
  console.log(result);
}

// Запис результату у файл, якщо задано
if (options.output) {
  try {
    fs.writeFileSync(options.output, JSON.stringify(result, null, 2));
    console.log(`Результат записано в файл: ${options.output}`);
  } catch (err) {
    console.error('Error writing to output file');
    process.exit(1);
  }
}
