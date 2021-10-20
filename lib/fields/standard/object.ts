import { FieldModel, FieldType } from "../base";
import { OptionalField } from "./optional";

export type ObjectFieldKey = string | number | symbol;

export type ObjectFieldModel = {
    [s: ObjectFieldKey]: FieldModel<unknown>;
};

export class ObjectField<T extends ObjectFieldModel> extends FieldModel<
    ObjectFieldType<T>
> {
    constructor(public readonly model: T) {
        super();
    }

    override name = `ObjectField<{\n${Object.entries(this.model)
        .map(([k, v]) => `${k}: ${v.name}`)
        .join("\n")}\n}>`;

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
                !(this.model[k]! instanceof OptionalField)
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
}

export type ObjectFieldType<T extends ObjectFieldModel> = {
    [K in keyof T]: FieldType<T[K]>;
};
