import { test, expect } from "bun:test"
import { calculateTtcPrice, applyDiscount } from "../src/carpaccio"

test("Calcul du prix brut", () => {
	expect(calculateTtcPrice(100, 10, "CA")).toBeCloseTo(1050.03, 2)
	expect(calculateTtcPrice(200, 5, "TX")).toBeCloseTo(1030.63, 2)
})

test("Application des réductions", () => {
	expect(applyDiscount(999)).toBe(999) // Pas de réduction
	expect(applyDiscount(1000)).toBe(970) // 5% de réduction
	expect(applyDiscount(5000)).toBe(4750) // 10% de réduction
})

test("Gestion des taxes", () => {
	expect(calculateTtcPrice(100, 20, "UT")).toBeCloseTo(2072.89, 2)
	expect(calculateTtcPrice(50, 100, "CA")).toBeCloseTo(5141.88, 2)
})

test("État non pris en charge", () => {
	expect(() => calculateTtcPrice(100, "FF")).toThrow("État non pris en charge")
})

test("Valeurs négatives interdites", () => {
	expect(() => calculateTtcPrice(-100, 10, "CA")).toThrow()
	expect(() => calculateTtcPrice(100, -10, "TX")).toThrow()
})
