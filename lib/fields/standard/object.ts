import { FieldModel, FieldType } from "../base";
import { NullableField } from "../advanced/nullable";

export type ObjectFieldKey = string | number | symbol;

export type ObjectFieldModel = {
    [s: ObjectFieldKey]: FieldModel<unknown>;
};

/**
 * Object field.
 *
 * @example
 * ```ts
 * const schema = fields.object({
 *      a: fields.number()
 * });
 *
 * schema.create({
 *      a: 1
 * });
 * ```
 */
export class ObjectField<T extends ObjectFieldModel> extends FieldModel<
    ObjectFieldType<T>
> {
    constructor(public readonly model: T) {
        super();
    }

    override validate(value: unknown, key: string = "value"): true | never {
        if (
            typeof value !== "object" ||
            Array.isArray(value) ||
            value === null
        ) {
            throw new TypeError(`'${key}' must be an 'object'`);
        }

        const modelKeys: (keyof ObjectFieldType<T>)[] = Object.keys(this.model);
        const valueKeys: (keyof ObjectFieldType<T>)[] = Object.keys(value);

        modelKeys.forEach((k) => {
            if (
                !valueKeys.includes(k) &&
                !(this.model[k]! instanceof NullableField)
            ) {
                throw new RangeError(`'${key}' has a missing key '${k}'`);
            }
        });

        valueKeys.forEach((k) => {
            if (!modelKeys.includes(k)) {
                throw new RangeError(`'${key}' contains an unknown key '${k}'`);
            }

            this.model[k]!.validate(
                (<ObjectFieldType<T>>value)[k],
                `${key}.${k}`
            );
        });

        return true;
    }

    override get name() {
        return `ObjectField<${this.type}>`;
    }

    override get type() {
        return `{\n${Object.entries(this.model)
            .map(([k, v]) => `  ${k}: ${v.name};`)
            .join("\n")}\n}`;
    }
}

// TODO: Make keys really "optional"
// Pending at:
//      https://github.com/microsoft/TypeScript/issues/44261
//      https://github.com/microsoft/TypeScript/issues/44261
export type ObjectFieldType<T extends ObjectFieldModel> = {
    [K in keyof T]: FieldType<T[K]>;
};
