/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedRawOutput = [
  {
    key: 'follow', newValue: undefined, oldValue: false, state: 'deleted',
  },
  {
    key: 'host', newValue: 'hexlet.io', oldValue: 'hexlet.io', state: 'shared',
  },
  {
    key: 'proxy', newValue: undefined, oldValue: '123.234.53.22', state: 'deleted',
  },
  {
    key: 'timeout', newValue: 20, oldValue: 50, state: 'updated',
  },
  {
    key: 'verbose', newValue: true, oldValue: undefined, state: 'added',
  },
];
const expectedStylishOutput = '{\n  - follow: false\n'
+ '    host: hexlet.io\n'
+ '  - proxy: 123.234.53.22\n'
+ '  - timeout: 50\n'
+ '  + timeout: 20\n'
+ '  + verbose: true\n}';

test('json and json, format stylish', () => {
  expect(
    genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'stylish',
    ),
  ).toBe(expectedStylishOutput);
});

test('json and json, format default', () => {
  expect(
    genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
    ),
  ).toStrictEqual(expectedRawOutput);
});

test('json and yaml, format default', () => {
  expect(
    genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.json'),
    ),
  ).toStrictEqual(expectedRawOutput);
});
