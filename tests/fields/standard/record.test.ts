import { fields } from "../../../lib";

const field = fields.record(
    fields.union(fields.string(), fields.number()),
    fields.boolean()
);

describe(field.name, () => {
    test(`${field.name}.create`, () => {
        // @ts-expect-error
        expect(() => field.create("hello")).toThrowError();
        // @ts-expect-error
        expect(() => field.create(1)).toThrowError();
        // @ts-expect-error
        expect(() => field.create(true)).toThrowError();
        // @ts-expect-error
        expect(() => field.create(false)).toThrowError();
        expect(() => field.create({})).not.toThrowError();
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
        expect(() =>
            field.create({
                a: true,
                b: false,
            })
        ).not.toThrowError();
        expect(() =>
            field.create({
                a: false,
                // @ts-expect-error
                b: "world",
            })
        ).toThrowError();
    });

    test(`${field.name}.check`, () => {
        expect(field.check("hello")).toBe(false);
        expect(field.check(1)).toBe(false);
        expect(field.check(true)).toBe(false);
        expect(field.check(false)).toBe(false);
        expect(field.check({})).toBe(true);
        expect(field.check([])).toBe(false);
        expect(field.check([1])).toBe(false);
        expect(field.check(["hello"])).toBe(false);
        expect(field.check(undefined)).toBe(false);
        expect(field.check(null)).toBe(false);
        expect(
            field.check({
                a: true,
                b: false,
            })
        ).toBe(true);
        expect(
            field.check({
                a: false,
                b: "world",
            })
        ).toBe(false);
    });
});
