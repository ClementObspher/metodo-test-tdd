export function intToRoman(num: number): string {
	if (num < 0) throw new Error("Number must be positive")
	if (num === 0) return ""
	if (num >= 3999) throw new Error("Number must be less than 3999")
	const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
	const syb = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
	let romanNum = ""
	let i = 0
	while (num > 0) {
		while (num >= val[i]) {
			romanNum += syb[i]
			num -= val[i]
		}
		i++
	}
	return romanNum
}
