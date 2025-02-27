const TAX_RATES = {
	UT: 0.0685, // Californie
	NV: 0.08, // Texas
	TX: 0.0625, // New York
	AL: 0.004, // Floride
	CA: 0.0825, // Nevada
}

export function applyDiscount(price: number) {
	if (price >= 1000 && price < 5000) {
		return price * 0.97
	}
	if (price >= 5000 && price < 7000) {
		return price * 0.95
	}
	if (price >= 7000 && price < 10000) {
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

export function calculateTtcPrice(unitPrice: number, state: keyof typeof TAX_RATES) {
	if (!TAX_RATES.hasOwnProperty(state)) {
		throw new Error("État non pris en charge")
	}

	let discountedPrice = applyDiscount(unitPrice)
	let taxRate = TAX_RATES[state]

	return Math.round(discountedPrice * (1 + taxRate) * 100) / 100
}

// Exemple d'utilisation
const unitPrice = 100 // Prix unitaire en dollars
const state = "CA" // État de livraison

console.log(`Prix TTC: ${calculateTtcPrice(unitPrice, state)}`)
