import { FieldModel, FieldType } from "../base";

export class OptionalField<T extends FieldModel<unknown>> extends FieldModel<
    FieldType<T> | null | undefined
> {
    constructor(public readonly model: T) {
        super();
    }

    override type = `${this.model.name} | null | undefined`;
    override name = `OptionalField<${this.type}>`;

    override validate(value: unknown, key: string = "value"): true | never {
        if (value === undefined || value === null) {
            return true;
        }

        return this.model.validate(value, key);
    }
}
