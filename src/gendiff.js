import { Command } from 'commander';
import parser from './parser.js'; 

const program = new Command();

program 
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .action((filepath1, filepath2, {format}) => {
        // console.log(file1, file2, format);
        const diff = parser(filepath1, filepath2)
        console.log(diff);
        // console.log(formatDiff(format || 'defaultFormat'));
    });

program.parse(process.argv);