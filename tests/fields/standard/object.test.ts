import SolidSchema from "../../../lib";

describe("ObjectField", () => {
    const field = new SolidSchema.Fields.ObjectField({
        a: new SolidSchema.Fields.StringField(),
        b: new SolidSchema.Fields.OptionalField(
            new SolidSchema.Fields.NumberField()
        ),
    });

    test(".create", () => {
        // @ts-expect-error
        expect(field.create("hello")).toThrowError();
        // @ts-expect-error
        expect(field.create(1)).toThrowError();
        // @ts-expect-error
        expect(field.create(true)).toThrowError();
        // @ts-expect-error
        expect(field.create(false)).toThrowError();
        // @ts-expect-error
        expect(field.create({})).toThrowError();
        // @ts-expect-error
        expect(field.create([])).toThrowError();
        // @ts-expect-error
        expect(field.create([1])).toThrowError();
        // @ts-expect-error
        expect(field.create(["hello"])).toThrowError();
        // @ts-expect-error
        expect(field.create(undefined)).toThrowError();
        // @ts-expect-error
        expect(field.create(null)).toThrowError();
        expect(
            field.create({
                a: "hello",
                b: undefined,
            })
        ).toBe({
            a: "hello",
        });
        expect(
            field.create({
                a: "hello",
                // @ts-expect-error
                b: "world",
            })
        ).toThrowError();
        expect(
            field.create({
                a: "hello",
                b: 1,
                // @ts-expect-error
                c: "foo",
            })
        ).toThrowError();
        expect(
            field.create({
                a: "hello",
                b: null,
            })
        ).toBe({
            a: "hello",
            b: null,
        });
        expect(
            field.create({
                a: "hello",
                b: 1,
            })
        ).toBe({
            a: "hello",
            b: 1,
        });
    });

    test(".check", () => {
        expect(field.check("hello")).toBe(false);
        expect(field.check(1)).toBe(false);
        expect(field.check(true)).toBe(false);
        expect(field.check(false)).toBe(false);
        expect(field.check({})).toBe(false);
        expect(field.check([])).toBe(false);
        expect(field.check([1])).toBe(false);
        expect(field.check(["hello"])).toBe(false);
        expect(field.check(undefined)).toBe(false);
        expect(field.check(null)).toBe(false);
        expect(
            field.check({
                a: "hello",
            })
        ).toBe(true);
        expect(
            field.check({
                a: "hello",
                b: "world",
            })
        ).toBe(false);
        expect(
            field.check({
                a: "hello",
                b: 1,
                c: "foo",
            })
        ).toBe(false);
        expect(
            field.check({
                a: "hello",
                b: null,
            })
        ).toBe(true);
        expect(
            field.check({
                a: "hello",
                b: 1,
            })
        ).toBe(true);
    });
});
