export const getDisplayColor = (romaji: string, input: string) => {
	let coloredRomaji = "";
	for (let i = 0; i < romaji.length; i++) {
		if (input[i] === romaji[i]) {
			coloredRomaji += `<span style="color: green;">${romaji[i]}</span>`;
		} else {
			coloredRomaji += `<span style="color: black;">${romaji[i]}</span>`;
		}
	}
	return coloredRomaji;
};
