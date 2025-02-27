import { test, expect } from "bun:test"
import { calculateTtcPrice, applyDiscount } from "../src/carpaccio"

test("Calcul du prix brut", () => {
	expect(calculateTtcPrice(100, 10, "CA")).toBeCloseTo(1028.75, 2)
	expect(calculateTtcPrice(200, 5, "TX")).toBeCloseTo(1062.5, 2)
})

test("Application des réductions", () => {
	expect(applyDiscount(1000, 5)).toBe(1000) // Pas de réduction
	expect(applyDiscount(1000, 10)).toBe(950) // 5% de réduction
	expect(applyDiscount(5000, 50)).toBe(4500) // 10% de réduction
})

test("Gestion des taxes", () => {
	expect(calculateTtcPrice(100, 20, "NY")).toBeCloseTo(1976, 2)
	expect(calculateTtcPrice(50, 100, "FL")).toBeCloseTo(4770, 2)
})

test("État non pris en charge", () => {
	expect(() => calculateTtcPrice(100, 10, "FF")).toThrow("État non pris en charge")
})

test("Valeurs négatives interdites", () => {
	expect(() => calculateTtcPrice(-100, 10, "CA")).toThrow()
	expect(() => calculateTtcPrice(100, -10, "TX")).toThrow()
})
