import { FieldModel } from "../base";

/**
 * `disallowNull` and `disallowUndefined` does not affect typings but only will throw error in runtime.
 */
export interface NullableFieldOptions {
    disallowNull?: boolean;
    disallowUndefined?: boolean;
}

/**
 * Optional field.
 * Matches the provided field and additionally allows `null` and `undefined` values.
 *
 * @example
 * ```ts
 * const schema = fields.nullable(fields.string());
 *
 * schema.create("hello");
 * schema.create(null);
 * ```
 */
export class NullableField<T> extends FieldModel<T | null | undefined> {
    constructor(
        public readonly model: FieldModel<T>,
        public readonly options?: NullableFieldOptions
    ) {
        super();
    }

    override validate(value: unknown, key: string = "value"): true | never {
        if (value === undefined && this.options?.disallowUndefined !== true) {
            return true;
        }

        if (value === null && this.options?.disallowNull !== true) {
            return true;
        }

        return this.model.validate(value, key);
    }

    override get name() {
        return `NullableField<${this.type}>`;
    }

    override get type() {
        return `${this.model.name} | null | undefined`;
    }
}
