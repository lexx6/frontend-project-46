import { cwd } from 'node:process';
import path from 'node:path'; 

const getPaths = (...filepaths) => [
    ...filepaths.map((filePath)=>({
        path: path.resolve(cwd(), filePath),
        ext: path.extname(filePath),
    }))
]

export default (filepath1, filepath2) => {
    return getPaths(filepath1, filepath2);
};