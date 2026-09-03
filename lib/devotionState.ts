import { getPrayers, type Language, type PrayerLanguage } from './prayers';

export type DevotionType = 'our-father-77' | 'divine-mercy' | 'seven-sorrows' | 'franciscan-crown';

export const DEVOTION_TYPES: DevotionType[] = ['our-father-77', 'divine-mercy', 'seven-sorrows', 'franciscan-crown'];

interface DevotionStep {
    label: string;
    text: string;
    section?: string;
}

// 1:1 from Android app/src/main/assets/devotions/en + in Markdown files.
// Labels/sections/literal texts below mirror DevotionParser output exactly
// (macros like @OurFather resolve at runtime via prayerLanguage, same as Android).

const SEVEN_SORROWS_EN = [
    ['The Prophecy of Simeon', 'Luke 2:34–35'],
    ['The Flight into Egypt', 'Matthew 2:13–15'],
    ['The Loss of Jesus in the Temple', 'Luke 2:41–52'],
    ['Mary Meets Jesus on the Way to Calvary', 'Luke 23:26–31'],
    ['The Crucifixion and Death of Jesus', 'John 19:25–30'],
    ["Mary Receives Jesus' Body", 'John 19:38–40'],
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

// 1:1 from Android strings.xml devotion_*_title
function devotionName(type: DevotionType, language: Language): string {
    const names = language === 'id'
        ? {
            'our-father-77': '77× Bapa Kami',
            'divine-mercy': 'Koronka Kerahiman Ilahi',
            'seven-sorrows': 'Rosario Tujuh Dukacita',
            'franciscan-crown': 'Mahkota Fransiskan',
        }
        : {
            'our-father-77': '77× Our Father',
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
        const isId = this.devotionLanguage === 'id';

        if (this.devotionType === 'our-father-77') {
            if (isId) {
                return [
                    { label: 'Tanda Salib', text: prayers.signOfCross },
                    {
                        label: 'Doa Pembuka',
                        text: 'Tuhan, kasihanilah kami.\nKristus, kasihanilah kami.\nTuhan, kasihanilah kami.\nKristus, dengarkanlah kami.\nKristus, kabulkanlah doa kami.',
                    },
                    {
                        label: 'Intensi Pribadi',
                        text: 'Bapa, hari ini kami datang ke hadapan-Mu. Dengarkanlah doa kami.\n\n(Sebutkan intensi pribadi Anda.)',
                    },
                    { label: 'Syahadat Para Rasul', text: prayers.apostlesCreed },
                    ...repeat('Bapa Kami', prayers.ourFather, 77),
                    { label: 'Kemuliaan', text: prayers.gloryBe },
                    { label: 'Tanda Salib', text: prayers.signOfCross },
                ];
            }
            return [
                { label: 'Sign of the Cross', text: prayers.signOfCross },
                {
                    label: 'Opening Petitions',
                    text: 'Lord, have mercy.\nChrist, have mercy.\nLord, have mercy.\nChrist, hear us.\nChrist, graciously hear us.',
                },
                {
                    label: 'Personal Intention',
                    text: 'Father, today we come before You. Hear our prayer.\n\n(Name your personal intention.)',
                },
                { label: "Apostles' Creed", text: prayers.apostlesCreed },
                ...repeat('Our Father', prayers.ourFather, 77),
                { label: 'Glory Be', text: prayers.gloryBe },
                { label: 'Sign of the Cross', text: prayers.signOfCross },
            ];
        }

        if (this.devotionType === 'divine-mercy') {
            if (isId) {
                const eternalFather = 'Bapa yang Kekal, kupersembahkan kepada-Mu Tubuh dan Darah, Jiwa dan Ke-Allahan Putra-Mu yang terkasih, Tuhan kami Yesus Kristus, sebagai pemulihan dosa-dosa kami dan dosa seluruh dunia.';
                const sorrowfulPassion = 'Demi sengsara Yesus yang pedih, tunjukkanlah belas kasih-Mu kepada kami dan seluruh dunia.';
                const holyGod = 'Allah yang Kudus, Kudus dan Berkuasa, Kudus dan Kekal, kasihanilah kami dan seluruh dunia.';

                const steps: DevotionStep[] = [
                    { label: 'Tanda Salib', text: prayers.signOfCross },
                    { label: 'Bapa Kami', text: prayers.ourFather },
                    { label: 'Salam Maria', text: prayers.hailMary },
                    { label: 'Syahadat Para Rasul', text: prayers.apostlesCreed },
                ];

                for (let decade = 1; decade <= 5; decade++) {
                    const section = `Dekade ${decade}`;
                    steps.push({ label: 'Bapa yang Kekal', text: eternalFather, section });
                    steps.push(...repeat('Demi Sengsara-Nya yang Pedih', sorrowfulPassion, 10, section));
                }

                steps.push(...repeat('Allah yang Kudus', holyGod, 3, 'Doa Penutup'));
                steps.push({ label: 'Tanda Salib', text: prayers.signOfCross, section: 'Doa Penutup' });
                return steps;
            }

            const eternalFather = 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.';
            const sorrowfulPassion = 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.';
            const holyGod = 'Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.';

            const steps: DevotionStep[] = [
                { label: 'Sign of the Cross', text: prayers.signOfCross },
                { label: 'Our Father', text: prayers.ourFather },
                { label: 'Hail Mary', text: prayers.hailMary },
                { label: "The Apostles' Creed", text: prayers.apostlesCreed },
            ];

            for (let decade = 1; decade <= 5; decade++) {
                const section = `Decade ${decade}`;
                steps.push({ label: 'Eternal Father', text: eternalFather, section });
                steps.push(...repeat('For the Sake of His Sorrowful Passion', sorrowfulPassion, 10, section));
            }

            steps.push(...repeat('Holy God', holyGod, 3, 'Concluding Prayer'));
            steps.push({ label: 'Sign of the Cross', text: prayers.signOfCross, section: 'Concluding Prayer' });
            return steps;
        }

        if (this.devotionType === 'franciscan-crown') {
            const joys = isId ? SEVEN_JOYS_ID : SEVEN_JOYS_EN;
            const joyLabel = isId ? 'Sukacita' : 'Joy';
            const ourFatherLabel = isId ? 'Bapa Kami' : 'Our Father';
            const hailMaryLabel = isId ? 'Salam Maria' : 'Hail Mary';
            const gloryBeLabel = isId ? 'Kemuliaan' : 'Glory Be';
            const intentions = isId ? 'Intensi Bapa Suci' : "Holy Father's Intentions";
            const steps: DevotionStep[] = [
                { label: isId ? 'Tanda Salib' : 'Sign of the Cross', text: prayers.signOfCross },
            ];

            joys.forEach(([title, reference], index) => {
                const section = `${joyLabel} ${index + 1}`;
                steps.push({ label: title, text: reference, section });
                steps.push({ label: ourFatherLabel, text: prayers.ourFather, section });
                steps.push(...repeat(hailMaryLabel, prayers.hailMary, 10, section));
                steps.push({ label: gloryBeLabel, text: prayers.gloryBe, section });
            });

            const honorSection = isId ? 'Menghormati Usia Maria' : "In Honor of Mary's Life";
            steps.push(...repeat(hailMaryLabel, prayers.hailMary, 2, honorSection));
            steps.push({ label: ourFatherLabel, text: prayers.ourFather, section: intentions });
            steps.push({ label: hailMaryLabel, text: prayers.hailMary, section: intentions });
            steps.push({ label: gloryBeLabel, text: prayers.gloryBe, section: intentions });
            return steps;
        }

        // seven-sorrows (1:1 from seven-sorrows.md, incl. separate title/reference announcement step)
        const sorrows = isId ? SEVEN_SORROWS_ID : SEVEN_SORROWS_EN;
        const sorrowLabel = isId ? 'Dukacita' : 'Sorrow';
        const ourFatherLabel = isId ? 'Bapa Kami' : 'Our Father';
        const hailMaryLabel = isId ? 'Salam Maria' : 'Hail Mary';
        const gloryBeLabel = isId ? 'Kemuliaan' : 'Glory Be';
        const invocation = isId
            ? 'Perawan yang Berdukacita, doakanlah kami.'
            : 'Virgin Most Sorrowful, pray for us.';
        const steps: DevotionStep[] = [
            { label: isId ? 'Tanda Salib' : 'Sign of the Cross', text: prayers.signOfCross },
        ];

        sorrows.forEach(([title, reference], index) => {
            const section = `${sorrowLabel} ${index + 1}`;
            steps.push({
                label: title,
                text: reference,
                section,
            });
            steps.push({ label: ourFatherLabel, text: prayers.ourFather, section });
            steps.push(...repeat(hailMaryLabel, prayers.hailMary, 7, section));
        });

        const tearsSection = isId ? 'Menghormati Air Mata Maria' : "In Honor of Mary's Tears";
        steps.push(...repeat(hailMaryLabel, prayers.hailMary, 3, tearsSection));
        const intentions = isId ? 'Intensi Bapa Suci' : "Holy Father's Intentions";
        steps.push({ label: ourFatherLabel, text: prayers.ourFather, section: intentions });
        steps.push({ label: hailMaryLabel, text: prayers.hailMary, section: intentions });
        steps.push({ label: gloryBeLabel, text: prayers.gloryBe, section: intentions });
        const closingSection = isId ? 'Doa Penutup' : 'Closing Invocation';
        const closingLabel = isId ? 'Doa Penutup' : 'Closing Invocation';
        steps.push(...repeat(closingLabel, invocation, 3, closingSection));
        return steps;
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
