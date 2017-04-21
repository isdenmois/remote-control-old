export default function sort(array, field) {
    if (array && array.sort) {
        return array.sort((a, b) => a[field].localeCompare(b[field]));
    }

    return [];
}
