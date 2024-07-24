import { reverseRomajiMap } from "@/utils/reverseRomajiMap";

const reversedMap = reverseRomajiMap();

export const convertToRomaji = (kana: string): Record<number, string[]> => {
	const result: Record<number, string[]> = {};
	let i = 0;

	while (i < kana.length) {
		let found = false;

		for (let j = 3; j > 0; j--) {
			if (i + j <= kana.length) {
				const substr = kana.substring(i, i + j);
				if (reversedMap[substr]) {
					result[i] = reversedMap[substr];

					if (substr === "ん") {
						const nextChar = kana[i + 1];
						if (i + 1 === kana.length || "なにぬねの".includes(nextChar)) {
							result[i] = ["nn"];
						} else {
							result[i].push("n");
						}
					}

					i += j;
					found = true;
					break;
				}
			}
		}

		if (!found) {
			const char = kana[i];
			result[i] = reversedMap[char] || [char];
			i++;
		}
	}

	return result;
};
