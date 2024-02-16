import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';

const getPaths = (...filepaths) => [
  ...filepaths.map((filePath) => ({
    path: path.resolve(cwd(), filePath),
    ext: path.extname(filePath),
  })),
];

const getData = ({ path: p, ext }) => {
  switch (ext) {
    case '.json': return JSON.parse(fs.readFileSync(p));
    case '.yml': return yaml.load(fs.readFileSync(p));
    default: throw new Error('Extension not found');
  }
};

export default (filepath1, filepath2) => {
  const paths = getPaths(filepath1, filepath2);
  return {
    data1: getData(paths[0]),
    data2: getData(paths[1]),
  };
};
