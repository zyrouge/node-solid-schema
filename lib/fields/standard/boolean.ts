import { FieldModel } from "../base";

export class BooleanField extends FieldModel<boolean> {
    override type = "boolean";
    override name = "BooleanField";

    override validate(value: unknown, key: string = "value"): true | never {
        if (typeof value !== "boolean") {
            throw new TypeError(`'${key}' must be a 'boolean'`);
        }

        return true;
    }
}
