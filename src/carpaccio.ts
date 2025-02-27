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
	if (price >= 10000 && price < 50000) {
		return price * 0.9
	}
	if (price >= 50000) {
		return price * 0.85
	}
	return price
}

export function calculateHtcPrice(unitPrice: number, quantity: number) {
	if (unitPrice < 0 || quantity < 0) {
		throw new Error("Les valeurs négatives ne sont pas autorisées")
	}

	let totalPrice = unitPrice * quantity
	let discountedPrice = applyDiscount(totalPrice)

	return Math.round(discountedPrice * 100) / 100
}

export function calculateTtcPrice(unitPrice: number, quantity: number, state: string) {
	if (!TAX_RATES.hasOwnProperty(state)) {
		throw new Error("État non pris en charge")
	}

	if (unitPrice < 0 || quantity < 0) {
		throw new Error("Les valeurs négatives ne sont pas autorisées")
	}

	let totalPrice = unitPrice * quantity
	let discountedPrice = applyDiscount(totalPrice)
	let taxRate = TAX_RATES[state as keyof typeof TAX_RATES]

	return Math.round(discountedPrice * (1 + taxRate) * 100) / 100
}

// Exemple d'utilisation
const unitPrice = 100 // Prix unitaire en dollars
const quantity = 20 // Nombre d'articles
const state = "CA" // État de livraison

console.log(`Prix TTC: ${calculateTtcPrice(unitPrice, quantity, state)}`)
