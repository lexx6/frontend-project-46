import _ from 'lodash';

const getIndent = (depth, intend = 4) => ' '.repeat(intend * depth);

const stringify = (data, depth) => {
  if (!_.isObject(data)) return data;
  const entries = Object.entries(data);
  const str = entries.map(([key, val]) => `\n${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`).join('');
  return `{${str}\n${getIndent(depth)}}`;
};

export default (data) => {
  const recursion = (nodes, depth) => nodes.map((node) => {
    const nextDepth = depth + 1;
    if (node.type === 'nested') {
      return `${getIndent(nextDepth)}${node.key}: {\n${recursion(node.children, nextDepth)}\n${getIndent(nextDepth)}}`;
    }
    if (node.type === 'deleted') {
      return `${getIndent(depth)}  - ${node.key}: ${stringify(node.value, nextDepth)}`;
    }
    if (node.type === 'added') {
      return `${getIndent(depth)}  + ${node.key}: ${stringify(node.value, nextDepth)}`;
    }
    if (node.type === 'changed') {
      return [
        `${getIndent(depth)}  - ${node.key}: ${stringify(node.value1, nextDepth)}`,
        `${getIndent(depth)}  + ${node.key}: ${stringify(node.value2, nextDepth)}`,
      ].join('\n');
    }
    if (node.type === 'shared') {
      return `${getIndent(depth)}    ${node.key}: ${stringify(node.value, depth + 1)}`;
    }
    throw new Error(`Unknown node type: ${node.type}`);
  }).join('\n');
  return `{\n${recursion(data, 0)}\n}`;
};
