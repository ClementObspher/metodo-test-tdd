import { test, expect } from "bun:test"
import { calculateTtcPrice, applyDiscount, calculateHtcPrice } from "../src/carpaccio"

test("Calcul du prix HT", () => {
	expect(calculateHtcPrice(100, 10)).toBeCloseTo(970, 2)
	expect(calculateHtcPrice(700, 5)).toBeCloseTo(3395, 2)
})

test("Calcul du prix TTC", () => {
	expect(calculateTtcPrice(100, 10, "CA")).toBeCloseTo(1050.03, 2)
	expect(calculateTtcPrice(200, 5, "TX")).toBeCloseTo(1030.63, 2)
})

test("Application des réductions", () => {
	expect(applyDiscount(999)).toBe(999) // Pas de réduction
	expect(applyDiscount(1000)).toBe(970) // 3% de réduction
	expect(applyDiscount(5000)).toBe(4750) // 5% de réduction
	expect(applyDiscount(7000)).toBe(6510) // 7% de réduction
	expect(applyDiscount(10000)).toBe(9000) // 10% de réduction
	expect(applyDiscount(50000)).toBe(42500) // 15% de réduction
})

test("Gestion des taxes", () => {
	expect(calculateTtcPrice(100, 20, "UT")).toBeCloseTo(2072.89, 2)
	expect(calculateTtcPrice(50, 100, "CA")).toBeCloseTo(5141.88, 2)
	expect(calculateTtcPrice(100, 10, "NV")).toBeCloseTo(1047.6, 2)
	expect(calculateTtcPrice(200, 5, "AL")).toBeCloseTo(973.88, 2)
	expect(calculateTtcPrice(100, 10, "TX")).toBeCloseTo(1030.63, 2)
})

test("État non pris en charge", () => {
	expect(() => calculateTtcPrice(100, 10, "FF")).toThrow("État non pris en charge")
})

test("Valeurs négatives interdites", () => {
	expect(() => calculateTtcPrice(-100, 10, "CA")).toThrow()
	expect(() => calculateTtcPrice(100, -10, "TX")).toThrow()
})
