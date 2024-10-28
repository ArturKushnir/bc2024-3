const { program } = require('commander');

program
  .option('-n, --name <type>', 'Ваше імʼя')
  .parse(process.argv);

const options = program.opts();
console.log(`Привіт, ${options.name || 'Світ'}!`);