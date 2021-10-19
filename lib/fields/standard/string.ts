import { FieldModel } from "../base";

export class StringField extends FieldModel<string> {
    constructor() {
        super();
    }

    override name = "StringField";

    override validate(value: unknown): true | never {
        if (typeof value !== "string") {
            throw new TypeError("'value' must be a 'string'");
        }

        return true;
    }
}
