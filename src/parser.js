import yaml from 'js-yaml';

export default (content, format) => {
  switch (format) {
    case 'json': return JSON.parse(content);
    case 'yml': return yaml.load(content);
    default: throw new Error(`Format ${format} not found`);
  }
};
