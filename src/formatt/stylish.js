export default (diff) => `{\n${diff.map((e) => {
  switch (e.state) {
    case 'shared': return `    ${e.key}: ${e.oldValue}`;
    case 'deleted': return `  - ${e.key}: ${e.oldValue}`;
    case 'added': return `  + ${e.key}: ${e.newValue}`;
    case 'updated': return `  - ${e.key}: ${e.oldValue}\n  + ${e.key}: ${e.newValue}`;
    default: throw new Error(`Wrong format: \n${JSON.stringify(diff)}`);
  }
}).join('\n')}\n}`;
