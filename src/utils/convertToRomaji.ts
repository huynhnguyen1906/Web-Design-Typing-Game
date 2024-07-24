// src/utils/convertToRomaji.ts

import { reverseRomajiMap } from "@/utils/reverseRomajiMap";

const reversedMap = reverseRomajiMap();

export const convertToRomaji = (kana: string): Record<string, string[]> => {
	const result: Record<string, string[]> = {};
	for (const char of kana) {
		if (reversedMap[char]) {
			result[char] = reversedMap[char];
		} else {
			result[char] = [char];
		}
	}
	console.log(result);
	return result;
};
