import { FieldModel } from "./base";
import { AnyField } from "./standard/any";
import { ArrayField } from "./standard/array";
import { BooleanField } from "./standard/boolean";
import { NumberField } from "./standard/number";
import {
    ObjectField,
    ObjectFieldKey,
    ObjectFieldModel,
} from "./standard/object";
import { RecordField } from "./standard/record";
import { StringField } from "./standard/string";
import { AndField } from "./advanced/and";
import { OrField } from "./advanced/or";
import { ConstantField } from "./advanced/constant";
import { TupleField } from "./advanced/tuple";
import { NullableField } from "./advanced/nullable";

export * from "./base";

export namespace fields {
    export const any = () => new AnyField();

    export const array = <T>(model: FieldModel<T>) => new ArrayField(model);

    export const boolean = () => new BooleanField();

    export const number = () => new NumberField();

    export const object = <T extends ObjectFieldModel>(model: T) =>
        new ObjectField(model);

    export const nullable = <T>(model: FieldModel<T>) =>
        new NullableField(model);

    export const record = <T extends ObjectFieldKey, U>(
        key: FieldModel<T>,
        value: FieldModel<U>
    ) => new RecordField(key, value);

    export const string = () => new StringField();

    export const or = <T, U>(model1: FieldModel<T>, model2: FieldModel<U>) =>
        new OrField(model1, model2);

    export const and = <T extends readonly ObjectField<{}>[]>(...models: T) =>
        new AndField(...models);

    export const constant = <T extends unknown>(value: T) =>
        new ConstantField(value);

    export const tuple = <T extends readonly FieldModel<unknown>[]>(
        ...values: T
    ) => new TupleField(...values);
}
