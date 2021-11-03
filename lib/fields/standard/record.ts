import { FieldModel } from "../base";
import { ObjectFieldKey } from "./object";

export class RecordField<T extends ObjectFieldKey, U> extends FieldModel<
    Record<T, U>
> {
    constructor(
        public readonly key: FieldModel<T>,
        public readonly value: FieldModel<U>
    ) {
        super();
    }

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

    override get name() {
        return `RecordField<${this.key.name}, ${this.value.name}>`;
    }

    override get type() {
        return `{\n  ${this.key.type}: ${this.value.type};\n}`;
    }
}
