import SolidSchema from "../../../lib";

describe("NumberField", () => {
    const field = new SolidSchema.Fields.NumberField();

    test(".check", () => {
        expect(field.check("hello")).toBe(false);
        expect(field.check(1)).toBe(true);
        expect(field.check(true)).toBe(false);
        expect(field.check(false)).toBe(false);
        expect(field.check({})).toBe(false);
        expect(field.check([])).toBe(false);
        expect(field.check([1])).toBe(false);
        expect(field.check(["hello"])).toBe(false);
        expect(field.check(undefined)).toBe(false);
        expect(field.check(null)).toBe(false);
    });
});
