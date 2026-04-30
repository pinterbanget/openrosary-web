'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { RosaryState } from '@/lib/rosaryState';
import { singleVibrate, tripleVibrate, doubleVibrate } from '@/lib/vibration';
import { AVAILABLE_LANGUAGES, type MysteryType, type Language, type PrayerLanguage } from '@/lib/prayers';

function RosaryContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const mysteryParam = searchParams.get('mystery') as MysteryType | null;
    const langParam = searchParams.get('lang') as Language | null;
    const prayerLangParam = searchParams.get('prayers') as PrayerLanguage | null;

    const [rosaryState, setRosaryState] = useState<RosaryState | null>(null);
    const [prayerText, setPrayerText] = useState('');
    const [prayerLabel, setPrayerLabel] = useState('');
    const [mysteryTitle, setMysteryTitle] = useState('');
    const [progress, setProgress] = useState(0);
    const [showCompletion, setShowCompletion] = useState(false);
    const [language, setLanguage] = useState<Language>('en');

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Update UI from current state
    const updateUIFromState = (state: RosaryState) => {
        setPrayerText(state.getCurrentPrayerText());
        setPrayerLabel(state.getCurrentPrayerLabel());

        const currentMystery = state.getCurrentMysteryTitle();
        if (currentMystery) {
            setMysteryTitle(currentMystery);
        } else {
            if (state.getLanguage() === 'id') {
                setMysteryTitle('Peristiwa ' + state.getMysteryType());
            } else {
                setMysteryTitle(state.getMysteryType() + ' Mysteries');
            }
        }

        setProgress(state.getTotalCount());
    };

    const syncQuery = (nextLanguage: Language, nextPrayerLanguage: PrayerLanguage) => {
        if (!mysteryParam) return;

        const params = new URLSearchParams();
        params.set('mystery', mysteryParam);
        if (nextLanguage !== 'en') {
            params.set('lang', nextLanguage);
        }
        if (nextPrayerLanguage === 'la') {
            params.set('prayers', nextPrayerLanguage);
        }

        router.replace(`/rosary?${params.toString()}`, { scroll: false });
    };

    // Initialize rosary state
    useEffect(() => {
        if (!mysteryParam || !['joyful', 'luminous', 'sorrowful', 'glorious'].includes(mysteryParam)) {
            router.push('/');
            return;
        }

        const lang = langParam === 'id' ? 'id' : 'en';
        const prayerLang = prayerLangParam === 'la' ? 'la' : lang;
        setLanguage(lang);

        const state = new RosaryState(mysteryParam, lang, prayerLang);
        // State starts at prayerCount=0 which is the first prayer - no need to advance
        updateUIFromState(state);
        setRosaryState(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mysteryParam, langParam, prayerLangParam]);

    // Handle language change from dropdown
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!rosaryState) return;
        const newLang = e.target.value as Language;
        const nextPrayerLang = rosaryState.getPrayerLanguage() === 'la' ? 'la' : newLang;
        setLanguage(newLang);
        rosaryState.setLanguage(newLang);
        rosaryState.setPrayerLanguage(nextPrayerLang);
        syncQuery(newLang, nextPrayerLang);
        updateUIFromState(rosaryState);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!rosaryState) return;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                advanceRosary();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                goBackRosary();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [rosaryState]);

    // Handle touch swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!rosaryState) return;

        const swipeDistance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                advanceRosary();
            } else {
                goBackRosary();
            }
        }
    };

    const advanceRosary = () => {
        if (!rosaryState) return;

        if (rosaryState.isComplete()) {
            setShowCompletion(true);
            return;
        }

        const isBeadTransition = rosaryState.isBeadTypeTransition(true);
        rosaryState.advance();
        updateUIFromState(rosaryState);

        if (rosaryState.isComplete()) {
            setShowCompletion(true);
        }

        if (isBeadTransition) {
            tripleVibrate();
        } else {
            singleVibrate();
        }
    };

    const goBackRosary = () => {
        if (!rosaryState) return;

        const currentCount = rosaryState.getTotalCount();
        if (currentCount <= 0) return;  // Can't go back from the very first prayer

        rosaryState.goBack();
        updateUIFromState(rosaryState);
        setShowCompletion(false);

        doubleVibrate();
    };

    if (!rosaryState) {
        return (
            <div className="loading">
                <p>loading...</p>
            </div>
        );
    }

    return (
        <main
            className="rosary-page"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="rosary-container">
                {/* Header with back link and language dropdown */}
                <div className="rosary-header">
                    <a href="/" className="back-link">← back</a>
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="lang-dropdown"
                        aria-label="Select reading language"
                    >
                        {AVAILABLE_LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>
                                {lang.nativeLabel}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Mystery Title - top, centered */}
                <h1 className="mystery-title">{mysteryTitle}</h1>

                {/* Prayer Label - centered */}
                <h2 className="prayer-label">{prayerLabel}</h2>

                {/* Prayer Text - scrollable middle section */}
                <div className="prayer-container">
                    <p className="prayer-text">{prayerText}</p>
                </div>

                {/* Progress Bar */}
                <div className="progress-section">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${(progress / 80) * 100}%` }}
                        />
                    </div>
                    <span className="progress-text">{progress}/80</span>
                </div>

                {/* Instructions */}
                <div className="instructions">
                    {language === 'id'
                        ? 'gunakan tombol panah atau geser untuk navigasi'
                        : 'use arrow keys or swipe to navigate'}
                </div>
            </div>

            {/* Completion Modal */}
            {showCompletion && (
                <div className="modal-backdrop open">
                    <div className="modal">
                        <h3>{language === 'id' ? 'rosario selesai' : 'rosary complete'}</h3>
                        <p className="muted">
                            {language === 'id'
                                ? `Anda telah menyelesaikan Peristiwa ${rosaryState.getMysteryType()} Rosario Suci. Tuhan memberkati Anda.`
                                : `You have completed the ${rosaryState.getMysteryType()} mysteries of the Holy Rosary. God bless you.`}
                        </p>
                        <button onClick={() => router.push('/')}>
                            {language === 'id' ? 'kembali ke beranda' : 'return to home'}
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default function RosaryPage() {
    return (
        <Suspense fallback={
            <div className="loading">
                <p>loading...</p>
            </div>
        }>
            <RosaryContent />
        </Suspense>
    );
}
