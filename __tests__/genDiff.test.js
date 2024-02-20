/* eslint-disable no-underscore-dangle */
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (name) => fs.readFileSync(getFixturePath(name));

test('json and json, format stylish', () => {
  expect(
    genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'stylish',
    ),
  ).toEqual(readFile('jsonJsonStylishTest.txt'));
});

test('json and json, format default', () => {
  expect(
    genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
    ),
  ).toEqual(readFile('jsonJsonRawTest.txt'));
});

test('json and yaml, format default', () => {
  expect(
    genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.json'),
    ),
  ).toEqual(readFile('yamlJsonRawTest.txt'));
});
