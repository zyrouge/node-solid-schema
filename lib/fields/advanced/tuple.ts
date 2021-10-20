import { FieldModel } from "../base";
import { stringifyValues, joinValues } from "../../utils/types";

const allowedTypes = ["string", "number"] as const;
type AllowedTypes = string | number;

export class TupleField<T extends AllowedTypes> extends FieldModel<T> {
    constructor(public readonly values: ReadonlyArray<T>) {
        super();

        values.forEach((x) => {
            if (
                !allowedTypes.includes(typeof x as typeof allowedTypes[number])
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
