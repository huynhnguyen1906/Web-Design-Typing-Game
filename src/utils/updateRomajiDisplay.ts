export const updateRomajiDisplay = (input: string, romajiMap: Record<number, string[]>) => {
    let index = 0;
    const display: string[] = [];

    for (const [kanaIndex, romajis] of Object.entries(romajiMap)) {
        let found = false;
        for (const romaji of romajis) {
            if (input.startsWith(romaji, index)) {
                display.push(romaji);
                index += romaji.length;
                found = true;
                break;
            }
        }
        if (!found) {
            display.push(romajis[0]);
        }
    }

    return display;
};
