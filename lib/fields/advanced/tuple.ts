import { FieldModel } from "../base";
import { stringifyValues, joinValues } from "../../utils/types";

/**
 * Tuple field.
 * When creating a value with this schema, all the values must be provided even if it's a optional field.
 *
 * @example
 * ```ts
 * const schema = fields.tuple(fields.constant("hello" as const), fields.number(), fields.boolean());
 *
 * schema.create("hello", 1, true);
 * ```
 */
export class TupleField<
    T extends readonly FieldModel<unknown>[]
> extends FieldModel<{
    [P in keyof T]: T[P] extends FieldModel<infer T> ? T : never;
}> {
    values: T;

    constructor(...values: T) {
        super();

        this.values = values;
    }

    override validate(value: unknown, key: string = "value"): true | never {
        if (!Array.isArray(value)) {
            throw new TypeError(`'${key}' must be an 'array'`);
        }

        if (value.length !== this.values.length) {
            throw new TypeError(`Length of '${key}' does not match the tuple`);
        }

        for (let i = 0; i < this.values.length; i++) {
            this.values[i]!.validate(value[i], `Index ${i}`);
        }

        return true;
    }

    override get name() {
        return `TupleField<${this.type}>`;
    }

    override get type() {
        return `(${joinValues(
            stringifyValues(this.values.map((x) => x.type)),
            ", "
        )})`;
    }
}
