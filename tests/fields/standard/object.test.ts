import { fields } from "../../../lib";

const field = fields.object({
    a: fields.string(),
    b: fields.nullable(fields.number()),
});

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
                a: "hello",
                b: undefined,
            })
        ).not.toThrowError();
        expect(() =>
            field.create({
                a: "hello",
                // @ts-expect-error
                b: "world",
            })
        ).toThrowError();
        expect(() =>
            field.create({
                a: "hello",
                b: 1,
                // @ts-expect-error
                c: "foo",
            })
        ).toThrowError();
        expect(() =>
            field.create({
                a: "hello",
                b: null,
            })
        ).not.toThrowError();
        expect(() =>
            field.create({
                a: "hello",
                b: 1,
            })
        ).not.toThrowError();
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
