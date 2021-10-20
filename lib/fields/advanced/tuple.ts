import { FieldModel } from "../base";

const allowedTypes = ["string", "number"] as const;
type AllowedTypes = string | number;

export class TupleField<
    T extends ReadonlyArray<AllowedTypes>
> extends FieldModel<T[number]> {
    constructor(public readonly values: T) {
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

    override name = `TupleField<${this.values.join(" | ")}>`;

    override validate(value: unknown, key: string = "value"): true | never {
        if (!this.values.includes(value as T[number])) {
            throw new TypeError(
                `'${key}' must be '${this.values
                    .map((x) => `'${x}'`)
                    .join(" or ")}'`
            );
        }

        return true;
    }
}
