import { FieldModel } from "../base";

/**
 * Number field.
 *
 * @example
 * ```ts
 * const schema = fields.number();
 *
 * schema.create(1);
 * ```
 */
export class NumberField extends FieldModel<number> {
    override validate(value: unknown, key: string = "value"): true | never {
        if (typeof value !== "number") {
            throw new TypeError(`'${key}' must be a 'number'`);
        }

        return true;
    }

    override get name() {
        return "NumberField";
    }

    override get type() {
        return "number";
    }
}
