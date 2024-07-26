// src/utils/reverseRomajiMap.ts

import { romajiMap } from '@/utils/romajiMap';

export const reverseRomajiMap = (): Record<string, string[]> => {
    const reversedMap: Record<string, string[]> = {};
    for (const [romaji, kana] of Object.entries(romajiMap)) {
        if (!reversedMap[kana]) {
            reversedMap[kana] = [];
        }
        reversedMap[kana].push(romaji);
    }
    return reversedMap;
};
