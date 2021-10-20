import { FieldModel, FieldType } from "../base";

export class RecordField<
    T extends FieldModel<unknown>,
    U extends FieldModel<unknown>
> extends FieldModel<Record<FieldType<T>, FieldType<U>>> {
    constructor(public readonly key: T, public readonly value: U) {
        super();
    }

    override type = `{\n  ${this.key.type}: ${this.value.type};\n}`;
    override name = `RecordField<${this.key.name}, ${this.value.name}>`;

    override validate(value: unknown, key: string = "value"): true | never {
        if (
            typeof value !== "object" ||
            Array.isArray(value) ||
            value === null
        ) {
            throw new TypeError(`'${key}' must be an 'object'`);
        }

        Object.entries(value).forEach(([k, v]) => {
            this.key.validate(k);
            this.value.validate(v);
        });

        return true;
    }
}
