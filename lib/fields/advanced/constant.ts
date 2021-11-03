import { FieldModel } from "../base";
import { stringifyValue } from "../../utils/types";

/**
 * Constant field.
 * Field matching only one pre-defined value. This uses `===` to compare. Try marking the value `as const` for the typings to work.
 *
 * @example
 * ```ts
 * const schema1 = fields.constant("hello" as const);
 * const schema2 = fields.constant(1 as const);
 * const schema3 = fields.constant(Symbol("hello") as const);
 *
 * schema1.create("hello");
 * schema2.create(1);
 * schema3.create("hello");
 * ```
 */
export class ConstantField<T extends unknown> extends FieldModel<T> {
    constructor(public readonly value: T) {
        super();
    }

    override validate(value: unknown, key: string = "value"): true | never {
        if (this.value !== (value as T)) {
            throw new TypeError(`'${key}' must be '${this.type}'`);
        }

        return true;
    }

    override get name() {
        return `ConstantField<${this.type}>`;
    }

    override get type() {
        return stringifyValue(this.value);
    }
}
