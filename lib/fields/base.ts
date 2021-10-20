import type { AnyField } from "./standard/any";
import type { ArrayField } from "./standard/array";
import type { BooleanField } from "./standard/boolean";
import type { NumberField } from "./standard/number";
import type { ObjectField, ObjectFieldType } from "./standard/object";
import type { OptionalField } from "./standard/optional";
import type { RecordField } from "./standard/record";
import type { StringField } from "./standard/string";
import type { UnionField } from "./advanced/union";
import type { TupleField } from "./advanced/tuple";

export class FieldModel<T> {
    name: string = "-";
    type: string = "-";

    create(value: T): T {
        this.validate(value);
        return value;
    }

    check(value: unknown): boolean {
        try {
            this.validate(value);
            return true;
        } catch (_) {
            return false;
        }
    }

    validate(_value: unknown, _key: string = "value"): true | never {
        throw new Error("'validate' method has not been implemented");
    }
}

export type FieldType<M extends FieldModel<unknown>> = M extends UnionField<
    infer T,
    infer U
>
    ? FieldType<T> | FieldType<U>
    : M extends TupleField<infer T>
    ? T
    : M extends ArrayField<infer T>
    ? FieldType<T>[]
    : M extends RecordField<infer T, infer U>
    ? Record<FieldType<T>, FieldType<U>>
    : M extends ObjectField<infer T>
    ? ObjectFieldType<T>
    : M extends BooleanField
    ? boolean
    : M extends OptionalField<infer T>
    ? FieldType<T> | null | undefined
    : M extends NumberField
    ? number
    : M extends StringField
    ? string
    : M extends AnyField
    ? any
    : never;
