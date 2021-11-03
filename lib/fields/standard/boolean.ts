import { FieldModel } from "../base";

export class BooleanField extends FieldModel<boolean> {
    override validate(value: unknown, key: string = "value"): true | never {
        if (typeof value !== "boolean") {
            throw new TypeError(`'${key}' must be a 'boolean'`);
        }

        return true;
    }

    override get name() {
        return "BooleanField";
    }

    override get type() {
        return "boolean";
    }
}
