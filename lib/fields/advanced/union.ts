import { FieldModel, FieldType } from "../base";

export class UnionField<
    T extends FieldModel<unknown>,
    U extends FieldModel<unknown>
> extends FieldModel<FieldType<T> | FieldType<U>> {
    constructor(public readonly model1: T, public readonly model2: U) {
        super();
    }

    override name = `UnionField<${this.model1.name} | ${this.model2.name}>`;

    override validate(value: unknown, key: string = "value"): true | never {
        let m1 = this.model1.check(value);
        let m2 = this.model2.check(value);

        if (!m1 && !m2) {
            throw new Error(
                `'${key}' must be '${this.model1.name}' or '${this.model2.name}'`
            );
        }

        return true;
    }
}
