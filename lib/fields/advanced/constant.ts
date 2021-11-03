import { FieldModel } from "../base";
import { stringifyValue } from "../../utils/types";

const ConstantFieldTypesValues = ["string", "number"] as const;
export type ConstantFieldTypes = string | number;

export class ConstantField<T extends ConstantFieldTypes> extends FieldModel<T> {
    constructor(public readonly value: T) {
        super();

        if (!ConstantFieldTypesValues.includes(typeof value as any)) {
            throw new TypeError(
                `'value' must be ${ConstantFieldTypesValues.map(
                    (x) => `'${x}'`
                ).join(" or ")}`
            );
        }
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
