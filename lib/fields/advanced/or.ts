import { FieldModel } from "../base";
import { joinValues } from "../../utils/types";

export class OrField<
    T extends readonly FieldModel<unknown>[]
> extends FieldModel<
    {
        [M in keyof T]: T[M] extends FieldModel<infer U> ? U : never;
    }[number]
> {
    models: T;

    constructor(...models: T) {
        super();

        this.models = models;
    }

    override validate(value: unknown, key: string = "value"): true | never {
        for (const model of this.models) {
            if (model.check(value)) {
                return true;
            }
        }

        throw new TypeError(
            `'${key}' must be did not satisfy any of the schema`
        );
    }

    override get name() {
        return `OrField<${this.type}>`;
    }

    override get type() {
        return `${joinValues(this.models.slice(0, 2).map((x) => x.name))}${
            this.models.length > 2 ? "..." : ""
        }`;
    }
}
