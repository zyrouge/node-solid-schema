import { ObjectField, ObjectFieldModel } from "../standard/object";

export class AndField<T extends readonly ObjectField<{}>[]> extends ObjectField<
    AndFieldType<T>
> {
    models: T;

    constructor(...models: T) {
        super(
            models
                .map((x) => x.model)
                .reduce((p, c) => {
                    return Object.assign(p, c);
                }, {} as ObjectFieldModel) as AndFieldType<T>
        );

        this.models = models;
    }

    override get name() {
        return `AndField<${this.type}>`;
    }
}

// Refer: https://github.com/microsoft/TypeScript/issues/29594#issuecomment-560045717
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type AndFieldType_<T extends readonly ObjectField<{}>[]> = UnionToIntersection<
    {
        [K in keyof T]: T[K] extends ObjectField<infer M> ? M : never;
    }[number]
>;

export type AndFieldType<T extends readonly ObjectField<{}>[]> =
    AndFieldType_<T> extends ObjectFieldModel ? AndFieldType_<T> : never;
