import { FieldModel } from "../base";

export class AnyField extends FieldModel<any> {
    override name = "AnyField";

    override validate(_value: unknown, _key: string = "value"): true | never {
        return true;
    }
}
