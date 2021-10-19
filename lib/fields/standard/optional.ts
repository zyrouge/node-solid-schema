import { FieldModel, FieldType } from "../base";

export class OptionalField<T extends FieldModel<unknown>> extends FieldModel<
    OptionalFieldType<T>
> {
    constructor(public readonly model: T) {
        super();
    }

    override name = `OptionalField<${super.name}>`;

    override validate(value: unknown): true | never {
        if (value === undefined || value === null) {
            return true;
        }

        return this.model.validate(value);
    }
}

export type OptionalFieldType<T extends FieldModel<unknown>> =
    | FieldType<T>
    | null
    | undefined;
