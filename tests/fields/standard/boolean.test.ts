import SolidSchema from "../../../lib";

describe("BooleanField", () => {
    const field = new SolidSchema.Fields.BooleanField();

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
