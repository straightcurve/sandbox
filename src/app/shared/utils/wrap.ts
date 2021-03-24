export default function wrap(value: number, left: number, right: number) {
    return value < left ? right + (value % right) : value % right;
}
