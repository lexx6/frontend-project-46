const getValueString = (node, key) => {
  if (Array.isArray(node[key])) return '[complex value]';
  if (typeof node[key] === 'string') return `'${node[key]}'`;
  if (typeof node[key] === 'boolean') return node[key];
  if (typeof node[key] === 'number') return node[key];
  if (typeof node[key] === 'symbol') return `'${node[key]}'`;
  if (node[key] === null) return 'null';
  if (node[key] === undefined) return 'undefined';

  throw new Error(`Unknown type of value: \n${JSON.stringify(node[key])}`);
};

const getNodesRecursive = (nodeList, depth = 0, path = []) => nodeList.map((node) => {
  switch (node.state) {
    case ('shared'): {
      return Array.isArray(node.children)
        ? getNodesRecursive(node.children, depth + 1, [...path, node.key]).join('')
        : '';
    }
    case ('added'): {
      return [
        `Property '${[...path, node.key].join('.')}' was added`,
        Array.isArray(node.children)
          ? `with value: ${getValueString(node, 'children')}\n`
          : `with value: ${getValueString(node, 'newVal')}\n`,
      ].join(' ');
    }
    case ('deleted'): {
      return `Property '${[...path, node.key].join('.')}' was removed\n`;
    }
    case ('updated'): {
      return [
        `Property '${[...path, node.key].join('.')}' was updated.`,
        Object.hasOwn(node, 'oldVal')
          ? `From ${getValueString(node, 'oldVal')}`
          : `From ${getValueString(node, 'children')}`,
        Object.hasOwn(node, 'newVal')
          ? `to ${getValueString(node, 'newVal')}\n`
          : `to ${getValueString(node, 'children')}\n`,
      ].join(' ');
    }
    default: throw new Error(`Wrong state: \n${JSON.stringify(node)}`);
  }
});

export default (diff) => {
  const nodes = getNodesRecursive(diff).join('').slice(0, -1);
  return `${nodes}`;
};
