import { keywords } from "@/utils/keyword";

export const getRandomKana = () => {
	const kanaKeys = Object.keys(keywords);
	return kanaKeys[Math.floor(Math.random() * kanaKeys.length)];
};
