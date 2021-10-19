import { FieldModel, FieldType } from "../base";

export class ArrayField<T extends FieldModel<unknown>> extends FieldModel<
    ArrayFieldType<T>
> {
    constructor(public readonly model: T) {
        super();
    }

    override name = `ArrayField<${this.model.name}>`;

    override validate(value: unknown): true | never {
        if (!Array.isArray(value)) {
            throw new TypeError("'value' must be an 'array'");
        }

        value.forEach((val) => {
            this.model.validate(val);
        });

        return true;
    }
}

export type ArrayFieldType<T extends FieldModel<unknown>> = FieldType<T>[];
