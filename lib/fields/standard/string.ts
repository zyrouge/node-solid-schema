import { FieldModel } from "../base";

export class StringField extends FieldModel<string> {
    constructor() {
        super();
    }

    override validate(value: unknown, key: string = "value"): true | never {
        if (typeof value !== "string") {
            throw new TypeError(`'${key}' must be a 'string'`);
        }

        return true;
    }

    override get name() {
        return "StringField";
    }

    override get type() {
        return "string";
    }
}
