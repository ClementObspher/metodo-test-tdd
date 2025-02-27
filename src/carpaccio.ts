const TAX_RATES = {
	CA: 0.0725, // Californie
	TX: 0.0625, // Texas
	NY: 0.04, // New York
	FL: 0.06, // Floride
	NV: 0.0685, // Nevada
}

export function applyDiscount(price: number) {
	if (price >= 1000 && price < 5000) {
		return price * 0.97
	}
	if (price >= 5000 < 7000) {
		return price * 0.95
	}
	if (price >= 7000 < 10000) {
		return price * 0.93
	}
	if (price >= 10000) {
		return price * 0.9
	}
	if (price >= 50000) {
		return price * 0.85
	}
	return price
}

export function calculateTtcPrice(unitPrice: number, quantity: number, state: keyof typeof TAX_RATES) {
	if (!TAX_RATES.hasOwnProperty(state)) {
		throw new Error("État non pris en charge")
	}

	let totalPrice = unitPrice * quantity
	let discountedPrice = applyDiscount(totalPrice, quantity)
	let taxRate = TAX_RATES[state]

	return Math.round(discountedPrice * (1 + taxRate) * 100) / 100
}

// Exemple d'utilisation
const unitPrice = 100 // Prix unitaire en dollars
const quantity = 20 // Nombre d'articles
const state = "CA" // État de livraison

console.log(`Prix TTC: ${calculateTtcPrice(unitPrice, quantity, state)}`)
