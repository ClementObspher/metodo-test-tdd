import { test, expect } from "bun:test"
import { calculateTtcPrice, applyDiscount } from "../src/carpaccio"

test("Calcul du prix brut", () => {
	expect(calculateTtcPrice(100, "CA")).toBeCloseTo(1028.75, 2)
	expect(calculateTtcPrice(200, "TX")).toBeCloseTo(1062.5, 2)
})

test("Application des réductions", () => {
	expect(applyDiscount(1000)).toBe(1000) // Pas de réduction
	expect(applyDiscount(1000)).toBe(950) // 5% de réduction
	expect(applyDiscount(5000)).toBe(4500) // 10% de réduction
})

test("Gestion des taxes", () => {
	expect(calculateTtcPrice(100, "UT")).toBeCloseTo(1976, 2)
	expect(calculateTtcPrice(50, "CA")).toBeCloseTo(4770, 2)
})

test("État non pris en charge", () => {
	expect(() => calculateTtcPrice(100, "FF")).toThrow("État non pris en charge")
})

test("Valeurs négatives interdites", () => {
	expect(() => calculateTtcPrice(-100, "CA")).toThrow()
	expect(() => calculateTtcPrice(100, "TX")).toThrow()
})
