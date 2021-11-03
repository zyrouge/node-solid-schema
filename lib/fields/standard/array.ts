import { FieldModel } from "../base";

/**
 * Array field.
 *
 * @example
 * ```ts
 * const schema = fields.array(fields.string());
 *
 * schema.create(["hello", "world"]);
 * ```
 */
export class ArrayField<T> extends FieldModel<T[]> {
    constructor(public readonly model: FieldModel<T>) {
        super();
    }

    override validate(value: unknown, key: string = "value"): true | never {
        if (!Array.isArray(value)) {
            throw new TypeError(`'${key}' must be an 'array'`);
        }

        value.forEach((val, i) => {
            this.model.validate(val, `Index ${i}`);
        });

        return true;
    }

    override get name() {
        return `ArrayField<${this.model.name}>`;
    }

    override get type() {
        return `${this.model.name}[]`;
    }
}
