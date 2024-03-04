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

export default (filepath1, filepath2, format) => {
  const data = parser(filepath1, filepath2);
  const tree = createTreeRecursive(data.data1, data.data2);
  return getFormatted(tree, format);
};
