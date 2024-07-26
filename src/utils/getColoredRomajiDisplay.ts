import { getDisplayColor } from './getDisplayColor';

export const getColoredRomajiDisplay = (romajiDisplay: string[], inputValue: string) => {
    let inputIndex = 0;
    return romajiDisplay.map((romaji, index) => {
        const remainingInput = inputValue.substring(inputIndex);
        const coloredRomaji = getDisplayColor(romaji, remainingInput);
        inputIndex += romaji.length;
        return { key: index, coloredRomaji };
    });
};
