const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

export default (diff) => {
  const recursion = (nodeList, path = []) => nodeList.map((node) => {
    switch (node.type) {
      case 'added': return [
        `Property '${[...path, node.key].join('.')}'`,
        `was added with value: ${stringify(node.value)}`,
      ].join(' ');
      case 'deleted': return `Property '${[...path, node.key].join('.')}' was removed`;
      case 'changed': return [
        `Property '${[...path, node.key].join('.')}' was updated.`,
        `From ${stringify(node.value1)}`,
        `to ${stringify(node.value2)}`,
      ].join(' ');
      case 'shared': return null;
      case 'nested': return `${recursion(node.children, [...path, node.key])}`;
      default: throw new Error(`Unknown node type: ${node.type}`);
    }
  }).filter((row) => row).join('\n');
  return `${recursion(diff).trim()}`;
};
