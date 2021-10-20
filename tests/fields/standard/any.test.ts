import SolidSchema from "../../../lib";

describe("AnyField", () => {
    const field = new SolidSchema.Fields.AnyField();

    test(".create", () => {
        expect(field.create("hello")).toBe("hello");
        expect(field.create(1)).toBe(1);
        expect(field.create(true)).toBe(true);
        expect(field.create(false)).toBe(false);
        expect(field.create({})).toBe({});
        expect(field.create([])).toBe([]);
        expect(field.create([1])).toBe([1]);
        expect(field.create(["hello"])).toBe(["hello"]);
        expect(field.create(undefined)).toBe(undefined);
        expect(field.create(null)).toBe(null);
    });

    test(".check", () => {
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
