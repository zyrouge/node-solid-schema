import { FieldModel } from "../base";

export interface StringFieldOptions {
    disallowWhiteSpace?: boolean;
    disallowZeroLength?: boolean;
}

/**
 * String field.
 *
 * @example
 * ```ts
 * const schema = fields.string();
 *
 * schema.create("hello");
 * ```
 */
export class StringField extends FieldModel<string> {
    constructor(public readonly options?: StringFieldOptions) {
        super();
    }

    override validate(value: unknown, key: string = "value"): true | never {
        if (typeof value !== "string") {
            throw new TypeError(`'${key}' must be a 'string'`);
        }

        if (this.options?.disallowZeroLength && value.length === 0) {
            throw new RangeError(`'${key}' must be longer than 1 character`);
        }

        if (this.options?.disallowWhiteSpace && value.trim().length === 0) {
            throw new RangeError(
                `'${key}' must be longer than 1 character without whitespaces`
            );
        }

        return true;
    }

    override get name() {
        return "StringField";
    }

    override get type() {
        return "string";
    }
}
