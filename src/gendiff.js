import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';
import parse from './parser.js';
import getFormatted from './formatter/index.js';

const createTreeRecursive = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  return keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key, type: 'nested', children: createTreeRecursive(data1[key], data2[key]),
      };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'shared', value: data1[key] };
    }
    return {
      key, type: 'changed', value1: data1[key], value2: data2[key],
    };
  });
};

const getFormat = (extension) => {
  switch (extension) {
    case 'json': return 'json';
    case 'yml': return 'yml';
    case 'yaml': return 'yml';
    default: throw new Error(`Extension ${extension} is not valid`);
  }
};

export default (filepath1, filepath2, format) => {
  const [data1, data2] = [filepath1, filepath2].map((filepath) => {
    const absolutePath = path.resolve(cwd(), filepath);
    const extension = path.extname(filepath).slice(1);
    return parse(fs.readFileSync(absolutePath), getFormat(extension));
  });
  const tree = createTreeRecursive(data1, data2);
  return getFormatted(tree, format);
};
