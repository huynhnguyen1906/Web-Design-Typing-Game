"use client";

import { useState, useEffect, useMemo } from "react";
import { convertToRomaji } from "@/utils/convertToRomaji";
import { keywords } from "@/utils/keyword";

export default function Home() {
	const [inputValue, setInputValue] = useState("");
	const [currentKanaIndex, setCurrentKanaIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [romajiDisplay, setRomajiDisplay] = useState<string[]>([]);
	const [correctIndex, setCorrectIndex] = useState(0);

	const kanaKeys = Object.keys(keywords);
	const currentKana = kanaKeys[currentKanaIndex];

	const romajiMap = useMemo(() => convertToRomaji(currentKana), [currentKana]);

	const updateRomajiDisplay = (input: string, romajiMap: Record<string, string[]>) => {
		let index = 0;
		const display: string[] = [];

		for (const [kana, romajis] of Object.entries(romajiMap)) {
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

	useEffect(() => {
		const initialRomajiDisplay = Object.values(romajiMap).map((romajis) => romajis[0]);
		setRomajiDisplay(initialRomajiDisplay);
		setCorrectIndex(0);
	}, [romajiMap]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const key = e.key;
			const newValue = inputValue + key;

			if (key.length === 1) {
				// Ignore keys like 'Shift', 'Ctrl', etc.
				const newCorrectIndex = getNewCorrectIndex(newValue, romajiDisplay, correctIndex);
				if (newCorrectIndex !== correctIndex) {
					setCorrectIndex(newCorrectIndex);
				}

				const newDisplay = updateRomajiDisplay(newValue, romajiMap);
				setInputValue(newValue);
				setRomajiDisplay(newDisplay);

				if (newCorrectIndex === romajiDisplay.join("").length) {
					setScore(score + 1);
					setInputValue("");
					setCurrentKanaIndex((currentKanaIndex + 1) % kanaKeys.length);
					setRomajiDisplay([]);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [inputValue, romajiMap, score, currentKanaIndex, kanaKeys, correctIndex, romajiDisplay]);

	const getNewCorrectIndex = (input: string, romajiDisplay: string[], currentIndex: number) => {
		let newIndex = currentIndex;
		for (let i = currentIndex; i < romajiDisplay.length; i++) {
			if (input.endsWith(romajiDisplay[i])) {
				newIndex += romajiDisplay[i].length;
			} else {
				break;
			}
		}
		return newIndex;
	};

	const getDisplayColor = (romaji: string, index: number, correctIndex: number) => {
		return index < correctIndex ? "green" : "black";
	};

	const getColoredRomajiDisplay = (romajiDisplay: string[], correctIndex: number) => {
		let display: JSX.Element[] = [];
		let index = 0;
		romajiDisplay.forEach((romaji, i) => {
			for (let j = 0; j < romaji.length; j++) {
				display.push(
					<span key={`${i}-${j}`} style={{ color: getDisplayColor(romaji[j], index, correctIndex) }}>
						{romaji[j]}
					</span>
				);
				index++;
			}
		});
		return display;
	};

	return (
		<div>
			<h1>{keywords[currentKana]}</h1>
			<div>{getColoredRomajiDisplay(romajiDisplay, correctIndex)}</div>
			<div>Score: {score}</div>
		</div>
	);
}
