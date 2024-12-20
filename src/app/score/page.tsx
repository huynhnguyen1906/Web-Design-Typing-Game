'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Style from '@styles/score.module.scss';
import Spinner from 'react-bootstrap/Spinner';

export default function Page() {
    const [score, setScore] = useState<number | null>(null);
    const [correctedWord, setCorrectedWord] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedScore = parseInt(localStorage.getItem('score') || '0');
        const storedCorrectedWord = parseInt(localStorage.getItem('correctWords') || '0');
        setScore(storedScore);
        setCorrectedWord(storedCorrectedWord);

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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                router.push('/');
            } else if (event.key === 'Enter') {
                router.push('/play');
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [router]);

    if (score === null || correctedWord === null) {
        return <Spinner animation="border"></Spinner>;
    }

    return (
        <div className={Style.container}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <span className={Style.line}>1</span>
                        </td>
                        <td>
                            <span className={Style.yellowA}>&#123;</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>2</span>
                        </td>
                        <td></td>
                        <td>
                            <span className={Style.key}>&quot;score&quot;:</span>
                            <span className={Style.pinkA}>&#91;</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>3</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>&#123;</td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>4</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <span className={Style.key}>&quot;point&quot;: </span>
                            <span className={Style.log}>&quot;{score}&quot;</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>5</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>&#125;,</td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>6</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>&#123;</td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>7</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <span className={Style.key}>&quot;correctedWord&quot;: </span>
                            <span className={Style.log}>&quot;{correctedWord}&quot;</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>8</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>&#125;</td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>9</span>
                        </td>
                        <td></td>
                        <td>
                            <span className={Style.pinkA}>&#93;</span>,
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>10</span>
                        </td>
                        <td></td>
                        <td>
                            <span className={Style.key}>&quot;action&quot;:</span>
                            <span className={Style.pinkA}> &#91;</span>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>11</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>&#123;</td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>12</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <span className={Style.key}>&quot;return to menu&quot;: </span>
                            <span className={Style.exit}>&quot;Press Esc&quot;</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>13</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>&#125;,</td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>14</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>&#123;</td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>15</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <span className={Style.key}>&quot;replay&quot;: </span>
                            <span className={Style.exit}>&quot;Press Enter&quot;</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>16</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>&#125;</td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>17</span>
                        </td>
                        <td></td>
                        <td>
                            <span className={Style.pinkA}>&#93;</span>,
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className={Style.line}>18</span>
                        </td>
                        <td>
                            <span className={Style.yellowA}>&#125;</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
