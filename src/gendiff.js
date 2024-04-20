import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';
import parser from './parser.js';
import getFormatted from './formatter/index.js';

const createTreeRecursive = (before, after) => {
  const keys = _.sortBy(_.union(_.keys(before), _.keys(after)));
  return keys.map((key) => {
    switch (true) {
      case (_.isObject(before[key]) && _.isObject(after[key])):
        return {
          key, state: 'shared', children: createTreeRecursive(before[key], after[key]),
        };
      case (_.isObject(before[key]) && !_.has(after, key)):
        return {
          key, state: 'deleted', children: createTreeRecursive(before[key], {}),
        };
      case (_.isObject(before[key]) && !_.isObject(after[key])):
        return {
          key, state: 'updated', newVal: after[key], children: createTreeRecursive(before[key], {}),
        };
      case (!_.has(before, key) && _.isObject(after[key])):
        return {
          key, state: 'added', children: createTreeRecursive({}, after[key]),
        };
      case (!_.isObject(before[key]) && _.isObject(after[key])):
        return {
          key, state: 'updated', oldVal: before[key], children: createTreeRecursive({}, after[key]),
        };
      case (before[key] === after[key]):
        return {
          key, state: 'shared', oldVal: before[key], newVal: after[key],
        };
      case (!_.has(before, key) && _.has(after, key)):
        return {
          key, state: 'added', newVal: after[key],
        };
      case (_.has(before, key) && !_.has(after, key)):
        return {
          key, state: 'deleted', oldVal: before[key],
        };
      case (before[key] !== after[key]):
        return {
          key, state: 'updated', oldVal: before[key], newVal: after[key],
        };
      default:
        throw new Error(`Unknown state\n before: ${JSON.stringify(before)}\n after: ${JSON.stringify(after)}`);
    }
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
