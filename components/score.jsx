import styles from './score.module.css';

export default function Score({score}) {
    let status = scoreToStatus(score);
    let title = '';

    // Width of text is not persistent, but we need element width
    // to calculate its left margin. We will use approximate width
    // in order to not overcomplicate things.
    // Relative to 1rem.
    let statusWidth = 0;

    if (score < 35) {
        statusWidth = 0.9;
        title = (
            `"Bad" means our model analyzed this article and found that it\n` +
            "is nearly devoid of any informative value. Scores in this range\n" +
            "are typical in fake/satire news outlets, marketing or advertising\n" +
            `copy, pure propaganda, or conspiracy theorists' websites.\n` +
            "Our model has no way to distinguish satire from intentionally\n" +
            "misleading materials, and therefore penalizes both to the same\n" +
            "degree (based on text alone)."
        );
    } else if (score < 65) {
        statusWidth = 2.05;
        title = (
            `"Mediocre" means our model analyzed the article and found that it\n` +
            "mixes some informative elements with A LOT of negative persuasion\n" +
            "techniques, aiming primarily to persuade (not inform) the reader.\n" +
            "Scores in this range are typical in partisan or agenda-driven websites,\n" +
            "and are often seen in some of the subtler propaganda campaigns."
        );
    } else if (score < 85) {
        statusWidth = 1.25;
        title = (
            `"Good" means our model analyzed the article's text and found that it\n` +
            "mixes informative elements with persuasive elements, aiming both to\n" +
            "inform and to sway the reader's opinion in some direction. In other\n" +
            "words, this article was penalized for using some unnecessary flourishes\n" +
            "(e.g. subjective language, biased presuppositions, hyperbolic choice of\n" +
            "words, etc) that a purely-informative article would generally avoid.\n" +
            "Scores in this range are typical for editorials or opinion articles."
        );
    } else {
        statusWidth = 1.4;
        title = (
            `"Great" means our model analyzed the article's text and found that it\n` +
            "is a) informative, and b) does not contain any negative elements that\n" +
            "attempt to persuade or trick the reader. Scores in this range are\n" +
            "typical for encyclopedia entries or strictly-factual news reports."
        );
    }

    let sliderColor = scoreToColor(score);

    const containerStyle = {
        '--score': score,
        '--statusWidth': statusWidth,
        '--sliderColor': sliderColor
    };

    return (
        <div
            className={styles.container}
            style={containerStyle}
        >
            <div
                className={styles.header}
            >
                <div
                    className={styles.title}
                >
                    {'Valurank'}
                </div>

                <div
                    className={styles.score}
                >
                    <span
                        className={styles.dot}
                    />
                    {`${score}/100`}
                </div>
            </div>

            <div
                className={styles.chart}
            >
                <div
                    className={styles.status}
                >
                    <span
                        title={title}
                    >
                        {status}
                    </span>
                </div>

                <div
                    className={styles.slider}

                />

                <div
                    className={styles.scale}
                >
                    <ScaleIcon />
                </div>

                <div
                    className={styles.labels}
                >
                    <span>
                        {'Bad'}
                    </span>
                    <span>
                        {'Perfect'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export function scoreToStatus(score) {
    if (score < 35) {
        return 'Bad';
    } else if (score < 65) {
        return 'Mediocre';
    } else if (score < 85) {
        return 'Good';
    } else {
        return 'Great';
    }
}

export function scoreToColor(score) {
    if (score < 20) {
        return '#EE5339';
    } else if (score < 40) {
        return '#F38E3A';
    } else if (score < 60) {
        return '#F6D243';
    } else if (score < 80) {
        return '#CDD649';
    } else {
        return '#5BAE50';
    }
}

function ScaleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="415" height="24" viewBox="0 0 415 24" fill="none">
            <g filter="url(#filter0_d_104_6209)">
                <rect x="0" y="0" width="415" height="24" rx="12" fill="url(#paint0_linear_104_6209)" />
            </g>
            <defs>
                <filter id="filter0_d_104_6209" x="0" y="0" width="415" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_104_6209" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_104_6209" x1="415" y1="24" x2="5.2742" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00A35E" />
                    <stop offset="0.473958" stopColor="#E6E939" />
                    <stop offset="1" stopColor="#FF0000" />
                </linearGradient>
            </defs>
        </svg>
    );
}
