export class FieldModel<T> {
    create(value: T): T {
        this.validate(value);
        return value;
    }

    check(value: unknown): boolean {
        try {
            this.validate(value);
            return true;
        } catch (_) {
            return false;
        }
    }

    validate(_value: unknown, _key: string = "value"): true | never {
        throw new Error("'validate' method has not been implemented");
    }

    get name(): string {
        return "-";
    }

    get type(): string {
        return "-";
    }
}

export type FieldType<M extends FieldModel<unknown>> = M extends FieldModel<
    infer T
>
    ? T
    : never;
