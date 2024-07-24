"use client";
import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { convertToRomaji } from "@/utils/convertToRomaji";
import { keywords } from "@/utils/keyword";
import { KeywordManager } from "@/utils/keywordManager";
import { isCorrectRomaji } from "@/utils/isCorrectRomaji";
import { updateRomajiDisplay } from "@/utils/updateRomajiDisplay";
import { getColoredRomajiDisplay } from "@/utils/getColoredRomajiDisplay";
import Style from "@styles/play.module.scss";

const keywordManager = new KeywordManager();

export default function Home() {
	const [inputValue, setInputValue] = useState("");
	const [currentKana, setCurrentKana] = useState<string | null>(null);
	const [score, setScore] = useState(0);
	const [romajiDisplay, setRomajiDisplay] = useState<string[]>([]);
	const [completedRows, setCompletedRows] = useState<JSX.Element[]>([]);
	const [completedValues, setCompletedValues] = useState<string[]>([]);
	const [isWordCompleted, setIsWordCompleted] = useState(false);
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
			setIsWordCompleted(true);
		}
	};

	useEffect(() => {
		if (isWordCompleted) {
			setScore((prevScore) => {
				const points = (currentKana?.length || 0) * 10;
				return prevScore + points;
			});

			setCompletedRows((prevRows) => [
				...prevRows,
				<React.Fragment key={`row-${prevRows.length}`}>
					<tr>
						<td>
							<span className={Style.line}>{prevRows.length * 3 + 1}</span>
						</td>
						<td>
							<span className={Style.const}>const</span>
							<span className={Style.var}>kana</span>
							<span>=</span>
							<span className={Style.string}>&quot;{currentKana && keywords[currentKana]}&quot;</span>
						</td>
					</tr>
					<tr>
						<td>
							<span className={Style.line}>{prevRows.length * 3 + 2}</span>
						</td>
						<td>
							<span className={Style.const}>const</span>
							<span className={Style.var}>romaji</span>
							<span>=</span>
							<span className={Style.string}>
								{getColoredRomajiDisplay(romajiDisplay, inputValue).map(({ key, coloredRomaji }) => (
									<span key={key} dangerouslySetInnerHTML={{ __html: coloredRomaji }} />
								))}
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<span className={Style.line}>{prevRows.length * 3 + 3}</span>
						</td>
						<td>
							<span className={Style.console}>console</span>.<span className={Style.log}>log</span>
							<span className={Style.bracket}>(</span>
							<span className={`${Style.string} ${Style.stringSpace}`}>&quot;{inputValue}&quot;</span>
							<span className={Style.bracket}>)</span>
						</td>
					</tr>
				</React.Fragment>,
			]);

			setCompletedValues((prevValues) => [...prevValues, inputValue]);

			setInputValue("");
			setCurrentKana(keywordManager.getRandomKana());
			setRomajiDisplay([]);
			setIsWordCompleted(false);

			if (inputRef.current) {
				inputRef.current.textContent = "";
			}
		}
	}, [isWordCompleted, currentKana, inputValue, romajiDisplay]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	};

	if (!currentKana) {
		return <div>Loading...</div>;
	}

	return (
		<div className={Style.container}>
			<table>
				<tbody>
					{completedRows}
					<tr key={`current-${completedRows.length}-1`}>
						<td>
							<span className={Style.line}>{completedRows.length * 3 + 1}</span>
						</td>
						<td>
							<span className={Style.const}>const</span>
							<span className={Style.var}>kana</span>
							<span>=</span>
							<span className={Style.string}>&quot;{keywords[currentKana]}&quot;</span>
						</td>
					</tr>
					<tr key={`current-${completedRows.length}-2`}>
						<td>
							<span className={Style.line}>{completedRows.length * 3 + 2}</span>
						</td>
						<td>
							<span className={Style.const}>const</span>
							<span className={Style.var}>romaji</span>
							<span>=</span>
							<span className={Style.string}>
								{getColoredRomajiDisplay(romajiDisplay, inputValue).map(({ key, coloredRomaji }) => (
									<span key={key} dangerouslySetInnerHTML={{ __html: coloredRomaji }} />
								))}
							</span>
						</td>
					</tr>
					<tr key={`current-${completedRows.length}-3`}>
						<td>
							<span className={Style.line}>{completedRows.length * 3 + 3}</span>
						</td>
						<td>
							<span className={Style.console}>console</span>.<span className={Style.log}>log</span>
							<span className={Style.bracket}>(</span>
							<span className={`${Style.string} ${Style.stringSpace}`}>
								&quot;
								<div
									ref={inputRef}
									contentEditable
									onInput={handleInputChange}
									onKeyDown={handleKeyDown}
									className={Style.input}
								></div>
								&quot;
							</span>
							<span className={Style.bracket}>)</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div className={Style.infoDiv}>
				<p>
					残り<span>60</span>秒
				</p>
				<p>Score: {score}</p>
			</div>
		</div>
	);
}
