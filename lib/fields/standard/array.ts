import { FieldModel, FieldType } from "../base";

export class ArrayField<T extends FieldModel<unknown>> extends FieldModel<
    FieldType<T>[]
> {
    constructor(public readonly model: T) {
        super();
    }

    override type = `${this.model.name}[]`;
    override name = `ArrayField<${this.model.name}>`;

    override validate(value: unknown, key: string = "value"): true | never {
        if (!Array.isArray(value)) {
            throw new TypeError(`'${key}' must be an 'array'`);
        }

        value.forEach((val, i) => {
            this.model.validate(val, `Index ${i}`);
        });

        return true;
    }
}
