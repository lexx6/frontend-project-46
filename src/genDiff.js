import parser from './parser.js'
import _ from 'lodash'
import stylish from './formatter/stylish.js'

const getStateByKey = (data1, data2, key) => {
    if (data1[key] === data2[key]) return 'shared';
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) return 'deleted';
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) return 'added';
    if (data1[key] !== data2[key]) return 'updated';
}

const getDiff = (data1, data2, keys) => {
    return keys.map((key) => ({
        key,
        state: getStateByKey(data1, data2, key),
        oldValue: data1[key],
        newValue: data2[key],
    }))
}

export default (filepath1, filepath2, format = null) => {
    const data = parser(filepath1, filepath2)
    const data1keys = Object.keys(data.data1);
    const data2keys = Object.keys(data.data2);
    const sortedKeys = _.sortBy(_.union(data1keys,data2keys));
    const diff = getDiff(data.data1, data.data2, sortedKeys); 
    switch (format) {
        case 'stylish': return stylish(diff);
        default: return diff;
    }
    // должен возвращаться String пропущенный через formatter зависящий от входящего параметра format
};

