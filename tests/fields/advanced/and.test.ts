import { fields } from "../../../lib";

const field = fields.and(
    fields.object({
        a: fields.number(),
    }),
    fields.object({
        b: fields.boolean(),
    })
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
        expect(() =>
            field.create({
                a: 1,
                b: true,
            })
        ).not.toThrowError();
        expect(() =>
            field.create({
                a: 2,
                // @ts-expect-error
                b: "world",
            })
        ).toThrowError();
        expect(() =>
            field.create({
                a: 3,
                b: false,
                // @ts-expect-error
                c: "foo",
            })
        ).toThrowError();
    });

    test(`${field.name}.check`, () => {
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
                a: 1,
                b: true,
            })
        ).toBe(true);
        expect(
            field.check({
                a: 2,
                b: "world",
            })
        ).toBe(false);
        expect(
            field.check({
                a: 3,
                b: false,
                c: "foo",
            })
        ).toBe(false);
    });
});
