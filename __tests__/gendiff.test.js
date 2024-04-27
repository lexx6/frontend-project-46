/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

const cases = [
  [getFixturePath('file1.json'), getFixturePath('file2.json'), readFile('StylishTest.txt')],
  [getFixturePath('file1.json'), getFixturePath('file2.json'), readFile('JsonTest.txt'), 'json'],
  [getFixturePath('file1.json'), getFixturePath('file2.json'), readFile('PlainTest.txt'), 'plain'],
  [getFixturePath('file1.json'), getFixturePath('file2.json'), readFile('StylishTest.txt'), 'stylish'],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), readFile('JsonTest.txt'), 'json'],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), readFile('PlainTest.txt'), 'plain'],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), readFile('StylishTest.txt'), 'stylish'],
];

test.each(cases)('diff beetween %s and %s', (file1, file2, result, format = 'stylish') => {
  expect(genDiff(file1, file2, format)).toEqual(result);
});
