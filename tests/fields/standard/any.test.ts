import { fields } from "../../../lib";

const field = fields.any();

describe(field.name, () => {
    test(`${field.name}.create`, () => {
        expect(() => field.create("hello")).not.toThrowError();
        expect(() => field.create(1)).not.toThrowError();
        expect(() => field.create(true)).not.toThrowError();
        expect(() => field.create(false)).not.toThrowError();
        expect(() => field.create({})).not.toThrowError();
        expect(() => field.create([])).not.toThrowError();
        expect(() => field.create([1])).not.toThrowError();
        expect(() => field.create(["hello"])).not.toThrowError();
        expect(() => field.create(undefined)).not.toThrowError();
        expect(() => field.create(null)).not.toThrowError();
    });

    test(`${field.name}.check`, () => {
        expect(field.check("hello")).toBe(true);
        expect(field.check(1)).toBe(true);
        expect(field.check(true)).toBe(true);
        expect(field.check(false)).toBe(true);
        expect(field.check({})).toBe(true);
        expect(field.check([])).toBe(true);
        expect(field.check([1])).toBe(true);
        expect(field.check(["hello"])).toBe(true);
        expect(field.check(undefined)).toBe(true);
        expect(field.check(null)).toBe(true);
    });
});
