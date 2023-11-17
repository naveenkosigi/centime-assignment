import { isEmpty } from "./helpers"

describe('API Helper - JS Code Test',() => {
    test('Testing isEmpty Method',() => {
        expect(isEmpty([])).toBe(true);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty("")).toBe(true);
    })
})