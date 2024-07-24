export const isCorrectRomaji = (input: string, romajiMap: Record<number, string[]>) => {
	let index = 0;
	for (const [kanaIndex, romajis] of Object.entries(romajiMap)) {
		let found = false;
		for (const romaji of romajis) {
			if (input.startsWith(romaji, index)) {
				index += romaji.length;
				found = true;
				break;
			}
		}
		if (!found) {
			return false;
		}
	}
	return index === input.length;
};
