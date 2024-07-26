import { keywords } from '@/utils/keyword';

export class KeywordManager {
    private unusedKeywords: string[];
    private allKeywords: string[];

    constructor() {
        this.allKeywords = Array.from(new Set(Object.keys(keywords)));
        this.unusedKeywords = [...this.allKeywords];
    }

    getRandomKana() {
        if (this.unusedKeywords.length === 0) {
            this.unusedKeywords = [...this.allKeywords];
        }
        const randomIndex = Math.floor(Math.random() * this.unusedKeywords.length);
        const randomKana = this.unusedKeywords[randomIndex];
        this.unusedKeywords.splice(randomIndex, 1);
        return randomKana;
    }
}
