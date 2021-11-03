import { FieldModel } from "../base";

export class AnyField extends FieldModel<any> {
    override validate(_value: unknown, _key: string = "value"): true | never {
        return true;
    }

    override get name() {
        return "AnyField";
    }

    override get type() {
        return "any";
    }
}
