import SolidSchema from "../../../lib";

describe("BooleanField", () => {
    const field = new SolidSchema.Fields.BooleanField();

    test(".create", () => {
        // @ts-expect-error
        expect(field.create("hello")).toThrowError();
        // @ts-expect-error
        expect(field.create(1)).toThrowError();
        expect(field.create(true)).toBe(true);
        expect(field.create(false)).toBe(false);
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
        expect(field.check("hello")).toBe(false);
        expect(field.check(1)).toBe(false);
        expect(field.check(true)).toBe(true);
        expect(field.check(false)).toBe(true);
        expect(field.check({})).toBe(false);
        expect(field.check([])).toBe(false);
        expect(field.check([1])).toBe(false);
        expect(field.check(["hello"])).toBe(false);
        expect(field.check(undefined)).toBe(false);
        expect(field.check(null)).toBe(false);
    });
});
