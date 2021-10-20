import { FieldModel } from "../base";

export class StringField extends FieldModel<string> {
    constructor() {
        super();
    }

    override type = "string";
    override name = "StringField";

    override validate(value: unknown, key: string = "value"): true | never {
        if (typeof value !== "string") {
            throw new TypeError(`'${key}' must be a 'string'`);
        }

        return true;
    }
}
