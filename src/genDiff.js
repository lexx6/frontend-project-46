import _ from 'lodash';
import parser from './parser.js';
import stylish from './formatter/stylish.js';

// рекурсивно создает дерево различий
const createTreeRecursive = (before, after) => {
  const keys = _.sortBy(_.union(_.keys(before), _.keys(after)));
  return keys.map((key) => {
    switch (true) {
      // объекты
      case (_.isObject(before[key]) && _.isObject(after[key])): // было/стало оба объекты
        return {
          key, state: 'nested', children: createTreeRecursive(before[key], after[key]),
        };
      case (_.isObject(before[key]) && !_.has(after, key)): // объект -> не стало
        return {
          key, state: 'deleted', children: createTreeRecursive(before[key], {}),
        };
      case (_.isObject(before[key]) && !_.isObject(after[key])): // объект -> не объект
        return {
          key, state: 'updated', newVal: after[key], children: createTreeRecursive(before[key], {}),
        };
      case (!_.has(before, key) && _.isObject(after[key])): // небыло -> стал объект
        return {
          key, state: 'added', children: createTreeRecursive({}, after[key]),
        };
      case (!_.isObject(before[key]) && _.isObject(after[key])): // был не объект -> стал объект
        return {
          key, state: 'updated', oldVal: before[key], children: createTreeRecursive({}, after[key]),
        };
      // не объекты
      case (before[key] === after[key]): // было/стало равны
        return {
          key, state: 'shared', oldVal: before[key], newVal: after[key],
        };
      case (!_.has(before, key) && _.has(after, key)): // не было -> стало
        return {
          key, state: 'added', newVal: after[key],
        };
      case (_.has(before, key) && !_.has(after, key)): // было -> не стало
        return {
          key, state: 'deleted', oldVal: before[key],
        };
      case (before[key] !== after[key]): // было/стало не равны
        return {
          key, state: 'updated', oldVal: before[key], newVal: after[key],
        };
      default: // не нашли вариант - бросаем ошибку
        throw new Error(`Unknown state\n before: ${JSON.stringify(before)}\n after: ${JSON.stringify(after)}`);
    }
  });
};

// возвращает String пропущенный через formatter зависящий от входящего параметра format
export default (filepath1, filepath2, format = null) => {
  const data = parser(filepath1, filepath2);
  const tree = createTreeRecursive(data.data1, data.data2); 
  switch (format) {
    case 'stylish': return stylish(tree);
    default: return tree;
  }
};
