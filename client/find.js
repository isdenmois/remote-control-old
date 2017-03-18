export default function find(array, cond) {
    for (let i = 0; i < array.length; i++) {
        for (let key in cond) {
            if (cond[key] === array[i][key]) {
                return array[i];
            }
        }
    }

    return null;
}
