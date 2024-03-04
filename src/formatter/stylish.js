const getNodesRecursive = (nodeList, depth = 0, symbolDepth = null) => nodeList.map((node) => {
  const getStringFormatted = (symbol, key, value, dep, symDepth = null) => {
    const defaultOffset = 2;
    const levelOffset = 4;
    const offset = ' '.repeat(levelOffset * dep + defaultOffset);
    const sym = symDepth !== null && dep > symDepth ? ' ' : symbol;
    const sibling = (val) => `{\n${val}${offset}  }\n`;
    return Array.isArray(value)
      ? `${offset}${sym} ${key}: ${sibling(getNodesRecursive(value, dep + 1, symDepth).join(''))}`
      : `${offset}${sym} ${key}: ${value}\n`;
  };

  switch (node.state) {
    case ('shared'): {
      return Array.isArray(node.children)
        ? getStringFormatted(' ', node.key, node.children, depth, symbolDepth)
        : getStringFormatted(' ', node.key, node.oldVal, depth, symbolDepth);
    }
    case ('deleted'): {
      return Array.isArray(node.children)
        ? getStringFormatted('-', node.key, node.children, depth, symbolDepth ?? depth)
        : getStringFormatted('-', node.key, node.oldVal, depth, symbolDepth);
    }
    case ('updated'): {
      return [
        Object.hasOwn(node, 'oldVal')
          ? getStringFormatted('-', node.key, node.oldVal, depth, symbolDepth)
          : getStringFormatted('-', node.key, node.children, depth, symbolDepth ?? depth),
        Object.hasOwn(node, 'newVal')
          ? getStringFormatted('+', node.key, node.newVal, depth, symbolDepth)
          : getStringFormatted('+', node.key, node.children, depth, symbolDepth ?? depth),
      ].join('');
    }
    case ('added'): {
      return Array.isArray(node.children)
        ? getStringFormatted('+', node.key, node.children, depth, symbolDepth ?? depth)
        : getStringFormatted('+', node.key, node.newVal, depth, symbolDepth);
    }
    default: throw new Error(`Wrong state: \n${JSON.stringify(node)}`);
  }
});

export default (diff) => {
  const nodes = getNodesRecursive(diff).join('');
  return `{\n${nodes}}`;
};
