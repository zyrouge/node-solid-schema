import { FieldModel } from "../base";
import { stringifyValues, joinValues } from "../../utils/types";

const TupleFieldTypesValues = ["string", "number"] as const;
export type TupleFieldTypes = string | number;

export class TupleField<T extends TupleFieldTypes> extends FieldModel<T> {
    constructor(public readonly values: ReadonlyArray<T>) {
        super();

        values.forEach((x) => {
            if (
                !TupleFieldTypesValues.includes(
                    typeof x as typeof TupleFieldTypesValues[number]
                )
            ) {
                throw new TypeError(
                    `Tuple 'values' must be ${values
                        .map((x) => `'${x}'`)
                        .join(" or ")}`
                );
            }
        });
    }

    override type = `(${joinValues(stringifyValues(this.values.concat()))})`;
    override name = `TupleField<${this.type}>`;

    override validate(value: unknown, key: string = "value"): true | never {
        if (!this.values.includes(value as T)) {
            throw new TypeError(`'${key}' must be '${this.type}'`);
        }

        return true;
    }
}
