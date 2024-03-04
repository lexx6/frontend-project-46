/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

test('json and json, format json', () => {
  expect(
    JSON.parse(
      genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'),
    ),
  ).toStrictEqual(JSON.parse(readFile('jsonJsonJsonTest.json')));
});

test('json and json, format stylish', () => {
  expect(
    genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'stylish',
    ),
  ).toEqual(readFile('jsonJsonStylishTest.txt'));
});

test('json and yaml, format stylish', () => {
  expect(
    genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.json'),
      'stylish',
    ),
  ).toEqual(readFile('yamlJsonStylishTest.txt'));
});

test('json and json, format plain', () => {
  expect(
    genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'plain',
    ),
  ).toEqual(readFile('jsonJsonPlainTest.txt'));
});
