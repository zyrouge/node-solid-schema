import SolidSchema from "../../../lib";

describe("ObjectField", () => {
    const field = new SolidSchema.Fields.ObjectField({
        a: new SolidSchema.Fields.StringField(),
        b: new SolidSchema.Fields.OptionalField(
            new SolidSchema.Fields.NumberField()
        ),
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
