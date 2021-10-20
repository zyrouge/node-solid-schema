import SolidSchema from "../../../lib";

describe("UnionField", () => {
    const field = new SolidSchema.Fields.UnionField(
        new SolidSchema.Fields.StringField(),
        new SolidSchema.Fields.NumberField()
    );

    test(".check", () => {
        expect(field.create("hello")).toBe("hello");
        expect(field.create(1)).toBe(1);
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
    });

    test(".check", () => {
        expect(field.check("hello")).toBe(true);
        expect(field.check(1)).toBe(true);
        expect(field.check(true)).toBe(false);
        expect(field.check(false)).toBe(false);
        expect(field.check({})).toBe(false);
        expect(field.check([])).toBe(false);
        expect(field.check([1])).toBe(false);
        expect(field.check(["hello"])).toBe(false);
        expect(field.check(undefined)).toBe(false);
        expect(field.check(null)).toBe(false);
    });
});
