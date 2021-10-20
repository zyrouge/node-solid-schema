import SolidSchema from "../../../lib";

describe("ArrayField", () => {
    const field = new SolidSchema.Fields.ArrayField(
        new SolidSchema.Fields.StringField()
    );

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
        expect(field.create([])).toBe([]);
        // @ts-expect-error
        expect(field.create([1])).toThrowError();
        expect(field.create(["hello"])).toBe(["hello"]);
        // @ts-expect-error
        expect(field.create(undefined)).toThrowError();
        // @ts-expect-error
        expect(field.create(null)).toThrowError();
    });

    test(".check", () => {
        expect(field.check("hello")).toBe(false);
        expect(field.check(1)).toBe(false);
        expect(field.check(true)).toBe(false);
        expect(field.check(false)).toBe(false);
        expect(field.check({})).toBe(false);
        expect(field.check([])).toBe(true);
        expect(field.check([1])).toBe(false);
        expect(field.check(["hello"])).toBe(true);
        expect(field.check(undefined)).toBe(false);
        expect(field.check(null)).toBe(false);
    });
});
