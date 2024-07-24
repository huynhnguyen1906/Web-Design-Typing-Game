export const getDisplayColor = (romaji: string, input: string) => {
	let coloredRomaji = "";
	for (let i = 0; i < romaji.length; i++) {
		if (input[i] === romaji[i]) {
			coloredRomaji += `<span style="color: #20e3b2;">${romaji[i]}</span>`;
		} else {
			coloredRomaji += `<span style="color: rgba(204, 204, 204, 0.7);">${romaji[i]}</span>`;
		}
	}
	return coloredRomaji;
};
