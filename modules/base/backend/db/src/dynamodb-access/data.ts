type Maybe = object | null | undefined;
type MaybeUndefined = object | undefined;
type MaybeNull = object | null;

interface IDynamoDbData {
    marshall: <T extends Maybe>(source: T) => object | undefined;
    unmarshall: <T extends Maybe>(source: T) => object | null;
}

const DATE_SUFFIX = ':date';

class DynamoDbData implements IDynamoDbData {
    marshall<T extends Maybe>(source: T): MaybeUndefined {
        if (source === null || source === undefined) return undefined;
        return Object.entries(source).reduce((prev, [key, value]) => {
            if (value instanceof Date) {
                return {
                    ...prev,
                    [`${key}${DATE_SUFFIX}`]: value.toISOString()
                };
            }
            if (typeof value === 'object') {
                return { ...prev, [key]: this.marshall(value) };
            }
            return { ...prev, [key]: value };
        }, {});
    }

    unmarshall<T extends object | null | undefined>(source: T): MaybeNull {
        if (source === null || source === undefined) return null;
        return Object.entries(source).reduce((prev, [key, value]) => {
            if (key.length > DATE_SUFFIX.length && key.endsWith(DATE_SUFFIX)) {
                return {
                    ...prev,
                    [key.slice(0, DATE_SUFFIX.length * -1)]: new Date(value)
                };
            }
            if (typeof value === 'object') {
                return { ...prev, [key]: this.unmarshall(value) };
            }
            return { ...prev, [key]: value };
        }, {});
    }
}

export type { IDynamoDbData };
export { DynamoDbData };
