import { FieldModel } from "../base";

export class NumberField extends FieldModel<number> {
    override name = "NumberField";

    override validate(value: unknown): true | never {
        if (typeof value !== "number") {
            throw new TypeError("'value' must be a 'number'");
        }

        return true;
    }
}
