"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { convertToRomaji } from "@/utils/convertToRomaji";
import { keywords } from "@/utils/keyword";
import { KeywordManager } from "@/utils/keywordManager";
import { isCorrectRomaji } from "@/utils/isCorrectRomaji";
import { updateRomajiDisplay } from "@/utils/updateRomajiDisplay";
import { getColoredRomajiDisplay } from "@/utils/getColoredRomajiDisplay";

const keywordManager = new KeywordManager();

export default function Home() {
	const [inputValue, setInputValue] = useState("");
	const [currentKana, setCurrentKana] = useState<string | null>(null);
	const [score, setScore] = useState(0);
	const [romajiDisplay, setRomajiDisplay] = useState<string[]>([]);
	const inputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCurrentKana(keywordManager.getRandomKana());
	}, []);

	const romajiMap = useMemo(() => (currentKana ? convertToRomaji(currentKana) : {}), [currentKana]);

	useEffect(() => {
		if (currentKana) {
			const initialRomajiDisplay = Object.values(romajiMap).map((romajis) => romajis[0]);
			setRomajiDisplay(initialRomajiDisplay);
		}
	}, [romajiMap, currentKana]);

	const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
		const value = e.currentTarget.textContent || "";
		setInputValue(value);

		const newDisplay = updateRomajiDisplay(value, romajiMap);
		setRomajiDisplay(newDisplay);

		if (isCorrectRomaji(value, romajiMap)) {
			const points = (currentKana?.length || 0) * 10;
			setScore(score + points);
			setInputValue("");
			setCurrentKana(keywordManager.getRandomKana());
			setRomajiDisplay([]);

			// Clear the content of the editable div
			if (inputRef.current) {
				inputRef.current.textContent = "";
			}
		}
	};

	if (!currentKana) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>
				<span>const </span>
				{getColoredRomajiDisplay(romajiDisplay, inputValue).map(({ key, coloredRomaji }) => (
					<span key={key} dangerouslySetInnerHTML={{ __html: coloredRomaji }} />
				))}
				<span> = </span>
				{keywords[currentKana]}
			</h1>
			<div>
				<span>console.log(&quot;</span>
				<div
					ref={inputRef}
					contentEditable
					onInput={handleInputChange}
					style={{
						display: "inline-block",
						minWidth: "3px",
						width: "auto",
						outline: "none",
						border: "none",
					}}
				></div>
				<span>&quot;)</span>
			</div>
			<div>Score: {score}</div>
		</div>
	);
}
