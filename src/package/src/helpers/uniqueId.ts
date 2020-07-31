export default function uniqueId(prefix?: string | undefined | null): string {
    return `${prefix ? prefix + "-" : ""}${genGUID()}${genGUID()}${genGUID()}`;
}

function genGUID(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
