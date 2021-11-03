import { FieldModel } from "../base";

export class OptionalField<T> extends FieldModel<T | null | undefined> {
    constructor(public readonly model: FieldModel<T>) {
        super();
    }
    override validate(value: unknown, key: string = "value"): true | never {
        if (value === undefined || value === null) {
            return true;
        }

        return this.model.validate(value, key);
    }

    override get name() {
        return `OptionalField<${this.type}>`;
    }

    override get type() {
        return `${this.model.name} | null | undefined`;
    }
}
