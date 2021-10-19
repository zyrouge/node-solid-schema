import { FieldModel } from "../base";

export class BooleanField extends FieldModel<boolean> {
    override name = "BooleanField";

    override validate(value: unknown): true | never {
        if (typeof value !== "boolean") {
            throw new TypeError("'value' must be a 'boolean'");
        }

        return true;
    }
}
