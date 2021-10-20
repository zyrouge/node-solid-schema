import { fields } from "../../../lib";

const field = fields.optional(fields.boolean());

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
        expect(() => field.create(undefined)).not.toThrowError();
        expect(() => field.create(null)).not.toThrowError();
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
        expect(field.check(undefined)).toBe(true);
        expect(field.check(null)).toBe(true);
    });
});
