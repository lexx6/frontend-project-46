import { cwd } from 'node:process'
import path from 'node:path'
import fs from 'node:fs'

const getPaths = (...filepaths) => [
    ...filepaths.map((filePath)=>({
        path: path.resolve(cwd(), filePath),
        ext: path.extname(filePath),
    }))
];

const getData = ({path, ext}) => {
    switch (ext) {
        case '.json': return JSON.parse(fs.readFileSync(path));
        default: throw new Error('Extension not found');
    }
}


export default (filepath1, filepath2) => {
    const paths = getPaths(filepath1, filepath2);
    return {
        data1: getData(paths[0]),  
        data2: getData(paths[1]),
    };
};