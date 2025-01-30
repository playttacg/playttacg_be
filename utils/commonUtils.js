export const isArrayEmpty = (array) => {
    if (!Array.isArray(array)) return true;
    return array.length === 0;
}