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

    override validate(value: unknown): true | never {
        if (
            typeof value !== "object" ||
            Array.isArray(value) ||
            value === null
        ) {
            throw new Error("'value' must be an 'object'");
        }

        const modelKeys: (keyof ObjectFieldType<T>)[] = Object.keys(this.model);
        const valueKeys: (keyof ObjectFieldType<T>)[] = Object.keys(value);

        modelKeys.forEach((key) => {
            if (
                !valueKeys.includes(key) &&
                !(this.model[key]! instanceof OptionalField)
            ) {
                throw new RangeError(`'value' has a missing key '${key}'`);
            }
        });

        valueKeys.forEach((key) => {
            if (!modelKeys.includes(key)) {
                throw new RangeError(
                    `'value' contains an unknown key '${key}'`
                );
            }

            this.model[key]!.validate((<ObjectFieldType<T>>value)[key]);
        });

        return true;
    }
}

export type ObjectFieldType<T extends ObjectFieldModel> = {
    [K in keyof T]: FieldType<T[K]>;
};
