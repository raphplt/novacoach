export function maj(word: string): string {
	if (!word) return word;
	return word.charAt(0).toUpperCase() + word.slice(1);
}
