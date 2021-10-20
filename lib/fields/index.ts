import { FieldModel } from "./base";
import { AnyField } from "./standard/any";
import { ArrayField } from "./standard/array";
import { BooleanField } from "./standard/boolean";
import { NumberField } from "./standard/number";
import { ObjectField, ObjectFieldModel } from "./standard/object";
import { OptionalField } from "./standard/optional";
import { RecordField } from "./standard/record";
import { StringField } from "./standard/string";
import { UnionField } from "./advanced/union";
import { TupleField, TupleFieldTypes } from "./advanced/tuple";

export * from "./base";

export namespace fields {
    export const any = () => new AnyField();

    export const array = <T extends FieldModel<unknown>>(model: T) =>
        new ArrayField(model);

    export const boolean = () => new BooleanField();

    export const number = () => new NumberField();

    export const object = <T extends ObjectFieldModel>(model: T) =>
        new ObjectField(model);

    export const optional = <T extends FieldModel<unknown>>(model: T) =>
        new OptionalField(model);

    export const record = <
        T extends FieldModel<unknown>,
        U extends FieldModel<unknown>
    >(
        key: T,
        value: U
    ) => new RecordField(key, value);

    export const string = () => new StringField();

    export const union = <
        T extends FieldModel<unknown>,
        U extends FieldModel<unknown>
    >(
        model1: T,
        model2: U
    ) => new UnionField(model1, model2);

    export const tuple = <T extends TupleFieldTypes>(
        values: ReadonlyArray<T>
    ) => new TupleField(values);
}
