const fs = require('fs');
const path = require('path');

// Отримуємо аргументи командного рядка
const args = process.argv.slice(2);
const params = {};

// Розбираємо аргументи командного рядка
for (let i = 0; i < args.length; i += 2) {
    const arg = args[i];
    const value = args[i + 1];
    if (arg === '-i' || arg === '--input') {
        params.input = value;
    } else if (arg === '-o' || arg === '--output') {
        params.output = value;
    } else if (arg === '-d' || arg === '--display') {
        params.display = true;
        i--;  // Цей параметр не потребує значення
    }
}

// Перевірка на обов'язковий параметр
if (!params.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// Перевірка на існування файлу
if (!fs.existsSync(params.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}
