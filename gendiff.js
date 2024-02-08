import { Command } from 'commander';
import { cwd } from 'node:process';
import path from 'node:path'; 

const program = new Command();

program 
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .action((filepath1, filepath2, {format}) => {
        const file1 = path.resolve(cwd(), filepath1); //path.extname()
        const file2 = path.resolve(cwd(), filepath2);
        console.log(file1, file2, format);
    });

program.parse(process.argv);