export default function normalize(value: number) {
    if (value === 0)
        return 0;

    return value < 0 ? -1 : 1;
}
