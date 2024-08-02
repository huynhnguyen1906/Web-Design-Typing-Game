'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { convertToRomaji } from '@/utils/convertToRomaji';
import { keywords } from '@/utils/keyword';
import { KeywordManager } from '@/utils/keywordManager';
import { isCorrectRomaji } from '@/utils/isCorrectRomaji';
import { updateRomajiDisplay } from '@/utils/updateRomajiDisplay';
import { getColoredRomajiDisplay } from '@/utils/getColoredRomajiDisplay';
import Style from '@styles/play.module.scss';
import Spinner from 'react-bootstrap/Spinner';

const keywordManager = new KeywordManager();

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [currentKana, setCurrentKana] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [correctWords, setCorrectWords] = useState(0);
    const [romajiDisplay, setRomajiDisplay] = useState<string[]>([]);
    const [completedRows, setCompletedRows] = useState<JSX.Element[]>([]);
    const [completedValues, setCompletedValues] = useState<string[]>([]);
    const [isWordCompleted, setIsWordCompleted] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem('score', '0');
        localStorage.setItem('correctWords', '0');

        setCurrentKana(keywordManager.getRandomKana());

        const disableMouseEvents = (e: MouseEvent) => {
            e.preventDefault();
        };

        document.addEventListener('mousedown', disableMouseEvents);
        document.addEventListener('mouseup', disableMouseEvents);
        document.addEventListener('click', disableMouseEvents);

        return () => {
            document.removeEventListener('mousedown', disableMouseEvents);
            document.removeEventListener('mouseup', disableMouseEvents);
            document.removeEventListener('click', disableMouseEvents);
        };
    }, []);

    const romajiMap = useMemo(() => (currentKana ? convertToRomaji(currentKana) : {}), [currentKana]);

    useEffect(() => {
        if (currentKana) {
            const initialRomajiDisplay = Object.values(romajiMap).map((romajis) => romajis[0]);
            setRomajiDisplay(initialRomajiDisplay);
        }
    }, [romajiMap, currentKana]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            const storedScore = parseInt(localStorage.getItem('score') || '0');
            const storedCorrectWords = parseInt(localStorage.getItem('correctWords') || '0');
            if (score > storedScore) {
                localStorage.setItem('score', score.toString());
            }
            if (correctWords > storedCorrectWords) {
                localStorage.setItem('correctWords', correctWords.toString());
            }
            router.push('/score');
        }
    }, [timeLeft, score, correctWords, router]);

    const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
        const value = e.currentTarget.textContent || '';
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

            setCorrectWords((prevCorrectWords) => prevCorrectWords + 1);

            setCompletedRows((prevRows) => [
                ...prevRows,
                <React.Fragment key={`row-${prevRows.length}`}>
                    <tr key={`row-${prevRows.length}-1`}>
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
                    <tr key={`row-${prevRows.length}-2`}>
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
                    <tr key={`row-${prevRows.length}-3`}>
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

            setInputValue('');
            setCurrentKana(keywordManager.getRandomKana());
            setRomajiDisplay([]);
            setIsWordCompleted(false);
        }
    }, [isWordCompleted, currentKana, inputValue, romajiDisplay, completedRows.length]);

    useEffect(() => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 2);
    }, [completedRows]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
        if (e.key === 'Escape') {
            router.push('/');
        }
    };

    if (!currentKana) {
        return <Spinner animation="border"></Spinner>;
    }

    return (
        <div className={Style.container}>
            <div className={Style.tableContainer}>
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
                                    {getColoredRomajiDisplay(romajiDisplay, inputValue).map(
                                        ({ key, coloredRomaji }) => (
                                            <span key={key} dangerouslySetInnerHTML={{ __html: coloredRomaji }} />
                                        ),
                                    )}
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
            </div>
            <div className={Style.hollowBlock}>
                <span>Press Esc to back to menu</span>
            </div>
            <div className={Style.infoDiv}>
                <p>
                    残り<span>{timeLeft}</span>秒
                </p>
                <p>Score: {score}</p>
            </div>
        </div>
    );
}
