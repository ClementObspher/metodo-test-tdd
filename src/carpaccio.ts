const TAX_RATES = {
	CA: 0.0725, // Californie
	TX: 0.0625, // Texas
	NY: 0.04, // New York
	FL: 0.06, // Floride
	NV: 0.0685, // Nevada
}

export function applyDiscount(price: number, quantity: number) {
	if (quantity >= 50) {
		return price * 0.9 // 10% de réduction
	} else if (quantity >= 10) {
		return price * 0.95 // 5% de réduction
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
