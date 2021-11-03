import { FieldModel } from "../base";

/**
 * Any field.
 * Allows any value.
 *
 * @example
 * ```ts
 * const schema = fields.any();
 *
 * schema.create(null);
 * ```
 */
export class AnyField extends FieldModel<any> {
    override validate(_value: unknown, _key: string = "value"): true | never {
        return true;
    }

    override get name() {
        return "AnyField";
    }

    override get type() {
        return "any";
    }
}
