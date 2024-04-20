import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';
import parser from './parser.js';
import getFormatted from './formatter/index.js';

const createTreeRecursive = (before, after) => {
  const keys = _.sortBy(_.union(_.keys(before), _.keys(after)));
  return keys.map((key) => {
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return {
        key, type: 'nested', children: createTreeRecursive(before[key], after[key]),
      };
    }
    if (!_.has(before, key) && _.has(after, key)) {
      return { key, type: 'added', value: after[key] };
    }
    if (_.has(before, key) && !_.has(after, key)) {
      return { key, type: 'deleted', value: before[key] };
    }
    if (before[key] === after[key]) {
      return { key, type: 'shared', value: before[key] };
    }
    return {
      key, type: 'changed', value1: before[key], value2: after[key],
    };
  });
};

const getFormat = (extension) => {
  switch (extension) {
    case '.json': return 'json';
    case '.yml': return 'yml';
    case '.yaml': return 'yml';
    default: throw new Error(`Extension ${extension} is not valid`);
  }
};

export default (filepath1, filepath2, format) => {
  const [data1, data2] = [filepath1, filepath2].map((filepath) => {
    const absolutePath = path.resolve(cwd(), filepath);
    const extension = path.extname(filepath);
    return parser(fs.readFileSync(absolutePath), getFormat(extension));
  });
  const tree = createTreeRecursive(data1, data2);
  return getFormatted(tree, format);
};
