import SolidSchema from "../../../lib";

const field = new SolidSchema.Fields.BooleanField();

describe(field.name, () => {
    test(`${field.name}.create`, () => {
        // @ts-expect-error
        expect(() => field.create("hello")).toThrowError();
        // @ts-expect-error
        expect(() => field.create(1)).toThrowError();
        expect(() => field.create(true)).not.toThrowError();
        expect(() => field.create(false)).not.toThrowError();
        // @ts-expect-error
        expect(() => field.create({})).toThrowError();
        // @ts-expect-error
        expect(() => field.create([])).toThrowError();
        // @ts-expect-error
        expect(() => field.create([1])).toThrowError();
        // @ts-expect-error
        expect(() => field.create(["hello"])).toThrowError();
        // @ts-expect-error
        expect(() => field.create(undefined)).toThrowError();
        // @ts-expect-error
        expect(() => field.create(null)).toThrowError();
    });

    test(`${field.name}.check`, () => {
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
