import { FieldModel } from "../base";

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
