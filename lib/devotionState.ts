import { getPrayers, getPrayerTitles, type Language, type PrayerLanguage } from './prayers';

export type DevotionType = 'our-father-77' | 'divine-mercy' | 'seven-sorrows' | 'franciscan-crown';

export const DEVOTION_TYPES: DevotionType[] = ['our-father-77', 'divine-mercy', 'seven-sorrows', 'franciscan-crown'];

interface DevotionStep {
    label: string;
    text: string;
    section?: string;
}

const SEVEN_SORROWS_EN = [
    ['The Prophecy of Simeon', 'Luke 2:34–35'],
    ['The Flight into Egypt', 'Matthew 2:13–15'],
    ['The Loss of Jesus in the Temple', 'Luke 2:41–52'],
    ['Mary Meets Jesus on the Way to Calvary', 'Luke 23:26–31'],
    ['The Crucifixion and Death of Jesus', 'John 19:25–30'],
    ['Mary Receives Jesus’ Body', 'John 19:38–40'],
    ['Jesus Is Laid in the Tomb', 'John 19:41–42'],
] as const;

const SEVEN_SORROWS_ID = [
    ['Nubuat Simeon', 'Lukas 2:34–35'],
    ['Pelarian ke Mesir', 'Matius 2:13–15'],
    ['Yesus Hilang di Bait Allah', 'Lukas 2:41–52'],
    ['Maria Berjumpa dengan Yesus di Jalan Salib', 'Lukas 23:26–31'],
    ['Yesus Disalibkan dan Wafat', 'Yohanes 19:25–30'],
    ['Maria Menerima Jenazah Yesus', 'Yohanes 19:38–40'],
    ['Yesus Dimakamkan', 'Yohanes 19:41–42'],
] as const;

const SEVEN_JOYS_EN = [
    ['The Annunciation', 'Luke 1:26–38'],
    ['The Visitation', 'Luke 1:39–56'],
    ['The Birth of Jesus and Adoration of the Magi', 'Luke 2:1–20; Matthew 2:1–12'],
    ['The Presentation of Jesus in the Temple', 'Luke 2:22–38'],
    ['The Finding of Jesus in the Temple', 'Luke 2:41–52'],
    ['The Resurrection of Jesus', 'Luke 24:1–12'],
    ['The Assumption of Mary', 'Revelation 12:1'],
] as const;

const SEVEN_JOYS_ID = [
    ['Kabar Sukacita', 'Lukas 1:26–38'],
    ['Kunjungan Maria kepada Elisabet', 'Lukas 1:39–56'],
    ['Kelahiran Yesus dan Penyembahan Orang Majus', 'Lukas 2:1–20; Matius 2:1–12'],
    ['Yesus Dipersembahkan di Bait Allah', 'Lukas 2:22–38'],
    ['Yesus Ditemukan di Bait Allah', 'Lukas 2:41–52'],
    ['Kebangkitan Yesus', 'Lukas 24:1–12'],
    ['Maria Diangkat ke Surga', 'Wahyu 12:1'],
] as const;

function devotionName(type: DevotionType, language: Language): string {
    const names = language === 'id'
        ? {
            'our-father-77': '77x Bapa Kami',
            'divine-mercy': 'Koronka Kerahiman Ilahi',
            'seven-sorrows': 'Rosario Tujuh Dukacita Maria',
            'franciscan-crown': 'Mahkota Fransiskan',
        }
        : {
            'our-father-77': '77x Our Father',
            'divine-mercy': 'Divine Mercy Chaplet',
            'seven-sorrows': 'Seven Sorrows Rosary',
            'franciscan-crown': 'Franciscan Crown',
        };
    return names[type];
}

function repeat(label: string, text: string, count: number, section?: string): DevotionStep[] {
    return Array.from({ length: count }, (_, index) => ({
        label: `${label} (${index + 1}/${count})`,
        text,
        section,
    }));
}

export class DevotionState {
    private devotionType: DevotionType;
    private devotionLanguage: Language;
    private devotionPrayerLanguage: PrayerLanguage;
    private stepIndex = 0;
    private isFinished = false;

    constructor(devotionType: DevotionType, language: Language = 'en', prayerLanguage: PrayerLanguage = language) {
        this.devotionType = devotionType;
        this.devotionLanguage = language;
        this.devotionPrayerLanguage = prayerLanguage;
    }

    getDevotionTypeKey(): DevotionType {
        return this.devotionType;
    }

    getLanguage(): Language {
        return this.devotionLanguage;
    }

    setLanguage(language: Language): void {
        this.devotionLanguage = language;
    }

    getPrayerLanguage(): PrayerLanguage {
        return this.devotionPrayerLanguage;
    }

    setPrayerLanguage(language: PrayerLanguage): void {
        this.devotionPrayerLanguage = language;
    }

    getDevotionName(): string {
        return devotionName(this.devotionType, this.devotionLanguage);
    }

    private getSteps(): DevotionStep[] {
        const prayers = getPrayers(this.devotionPrayerLanguage);
        const titles = getPrayerTitles(this.devotionPrayerLanguage);

        if (this.devotionType === 'our-father-77') {
            return [
                { label: titles.signOfCross, text: prayers.signOfCross },
                {
                    label: 'Permohonan',
                    text: 'Tuhan, kasihanilah kami.\nKristus, kasihanilah kami.\nTuhan, kasihanilah kami.\nKristus, dengarkanlah doa kami.\nKristus, kabulkanlah doa kami.',
                },
                {
                    label: 'Permohonan Pribadi',
                    text: 'Ya Bapa, hari ini kami menghadap kepada-Mu. Kabulkanlah permohonan kami.\n\n(Sebutkan permohonan Anda.)',
                },
                { label: titles.apostlesCreed, text: prayers.apostlesCreed },
                ...repeat(titles.ourFather, prayers.ourFather, 77),
                { label: titles.gloryBe, text: prayers.gloryBe },
                { label: titles.signOfCross, text: prayers.signOfCross },
            ];
        }

        if (this.devotionType === 'divine-mercy') {
            const eternalFather = this.devotionLanguage === 'id'
                ? 'Bapa yang kekal, kupersembahkan kepada-Mu Tubuh dan Darah, Jiwa dan Keallahan Putra-Mu yang terkasih, Tuhan kami Yesus Kristus, sebagai pendamaian bagi dosa kami dan dosa seluruh dunia.'
                : 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.';
            const sorrowfulPassion = this.devotionLanguage === 'id'
                ? 'Demi sengsara Yesus yang pedih, tunjukkanlah belas kasih-Mu kepada kami dan seluruh dunia.'
                : 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.';
            const holyGod = this.devotionLanguage === 'id'
                ? 'Allah Kudus, Kudus dan Berkuasa, Kudus dan Kekal, kasihanilah kami dan seluruh dunia.'
                : 'Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.';

            const steps: DevotionStep[] = [
                { label: titles.signOfCross, text: prayers.signOfCross },
                { label: titles.ourFather, text: prayers.ourFather },
                { label: titles.hailMary, text: prayers.hailMary },
                { label: titles.apostlesCreed, text: prayers.apostlesCreed },
            ];

            for (let decade = 1; decade <= 5; decade++) {
                const section = this.devotionLanguage === 'id' ? `Dekade ${decade}` : `Decade ${decade}`;
                steps.push({ label: this.devotionLanguage === 'id' ? 'Bapa Kekal' : 'Eternal Father', text: eternalFather, section });
                steps.push(...repeat(this.devotionLanguage === 'id' ? 'Demi Sengsara Yesus' : 'For the Sake of His Sorrowful Passion', sorrowfulPassion, 10, section));
            }

            return [
                ...steps,
                ...repeat(this.devotionLanguage === 'id' ? 'Allah Kudus' : 'Holy God', holyGod, 3),
            ];
        }

        if (this.devotionType === 'franciscan-crown') {
            const joys = this.devotionLanguage === 'id' ? SEVEN_JOYS_ID : SEVEN_JOYS_EN;
            const joyLabel = this.devotionLanguage === 'id' ? 'Sukacita' : 'Joy';
            const popeIntentions = this.devotionLanguage === 'id' ? 'Intensi Bapa Suci' : 'Holy Father’s Intentions';
            const steps: DevotionStep[] = [];

            joys.forEach(([title, reference], index) => {
                const section = `${joyLabel} ${index + 1}`;
                steps.push({ label: section, text: `${title}\n\n${reference}`, section });
                steps.push({ label: titles.ourFather, text: prayers.ourFather, section });
                steps.push(...repeat(titles.hailMary, prayers.hailMary, 10, section));
                steps.push({ label: titles.gloryBe, text: prayers.gloryBe, section });
            });

            return [
                ...steps,
                ...repeat(titles.hailMary, prayers.hailMary, 2, this.devotionLanguage === 'id' ? 'Menghormati Usia Maria' : 'In Honor of Mary’s Life'),
                { label: titles.ourFather, text: prayers.ourFather, section: popeIntentions },
                { label: titles.hailMary, text: prayers.hailMary, section: popeIntentions },
                { label: titles.gloryBe, text: prayers.gloryBe, section: popeIntentions },
            ];
        }

        const sorrows = this.devotionLanguage === 'id' ? SEVEN_SORROWS_ID : SEVEN_SORROWS_EN;
        const sorrowLabel = this.devotionLanguage === 'id' ? 'Dukacita' : 'Sorrow';
        const invocation = this.devotionLanguage === 'id'
            ? 'Perawan yang Amat Berdukacita, doakanlah kami.'
            : 'Virgin Most Sorrowful, pray for us.';
        const steps: DevotionStep[] = [];

        sorrows.forEach(([title, reference], index) => {
            const section = `${sorrowLabel} ${index + 1}`;
            steps.push({
                label: section,
                text: `${title}\n\n${reference}`,
                section,
            });
            steps.push({ label: titles.ourFather, text: prayers.ourFather, section });
            steps.push(...repeat(titles.hailMary, prayers.hailMary, 7, section));
        });

        return [
            ...steps,
            ...repeat(titles.hailMary, prayers.hailMary, 3, this.devotionLanguage === 'id' ? 'Menghormati Air Mata Maria' : 'In Honor of Mary’s Tears'),
            { label: titles.ourFather, text: prayers.ourFather, section: this.devotionLanguage === 'id' ? 'Intensi Bapa Suci' : 'Holy Father’s Intentions' },
            { label: titles.hailMary, text: prayers.hailMary, section: this.devotionLanguage === 'id' ? 'Intensi Bapa Suci' : 'Holy Father’s Intentions' },
            { label: titles.gloryBe, text: prayers.gloryBe, section: this.devotionLanguage === 'id' ? 'Intensi Bapa Suci' : 'Holy Father’s Intentions' },
            ...repeat(this.devotionLanguage === 'id' ? 'Doa Penutup' : 'Closing Invocation', invocation, 3),
        ];
    }

    advance(): void {
        if (this.isFinished) return;

        if (this.stepIndex >= this.getSteps().length - 1) {
            this.isFinished = true;
        } else {
            this.stepIndex++;
        }
    }

    goBack(): void {
        if (this.isFinished) {
            this.isFinished = false;
            return;
        }
        this.stepIndex = Math.max(0, this.stepIndex - 1);
    }

    isComplete(): boolean {
        return this.isFinished;
    }

    isBeadTypeTransition(isAdvancing: boolean): boolean {
        const steps = this.getSteps();
        const current = steps[this.stepIndex];
        const adjacent = steps[this.stepIndex + (isAdvancing ? 1 : -1)];
        return Boolean(adjacent && current.section !== adjacent.section);
    }

    getCurrentPrayerText(): string {
        if (this.isFinished) {
            return this.devotionLanguage === 'id' ? 'Doa selesai. Tuhan memberkati Anda.' : 'Prayer complete. God bless you.';
        }
        return this.getSteps()[this.stepIndex].text;
    }

    getCurrentPrayerLabel(): string {
        if (this.isFinished) return this.devotionLanguage === 'id' ? 'Selesai' : 'Complete';
        return this.getSteps()[this.stepIndex].label;
    }

    getCurrentSection(): string {
        return this.isFinished ? '' : this.getSteps()[this.stepIndex].section ?? '';
    }

    getTotalCount(): number {
        return this.isFinished ? this.getSteps().length : this.stepIndex;
    }

    getMaxCount(): number {
        return this.getSteps().length;
    }
}
