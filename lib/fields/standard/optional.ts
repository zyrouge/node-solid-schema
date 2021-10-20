import { FieldModel, FieldType } from "../base";

export class OptionalField<T extends FieldModel<unknown>> extends FieldModel<
    FieldType<T> | null | undefined
> {
    constructor(public readonly model: T) {
        super();
    }

    override name = `OptionalField<${super.name}>`;

    override validate(value: unknown, key: string = "value"): true | never {
        if (value === undefined || value === null) {
            return true;
        }

        return this.model.validate(value, key);
    }
}
