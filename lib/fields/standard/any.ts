import { FieldModel } from "../base";

export class AnyField extends FieldModel<any> {
    override name = "AnyField";

    override validate(_value: unknown): true | never {
        return true;
    }
}
