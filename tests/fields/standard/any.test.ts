import SolidSchema from "../../../lib";

describe("AnyField", () => {
    const field = new SolidSchema.Fields.AnyField();

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
