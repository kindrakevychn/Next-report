import {
    scoreToStatus,
    scoreToColor,
    scoreToDescription
} from '../lib/valurank';
import HoverInfo from './hover-info';

import styles from './score.module.css';

export default function Score({score}) {
    const status = scoreToStatus(score);
    const sliderColor = scoreToColor(score);
    const description = scoreToDescription(score);

    // Width of text is not persistent, but we need element width
    // to calculate its left margin. We will use approximate width
    // in order to not overcomplicate things.
    // Relative to 1rem.
    let statusWidth = 0;

    switch (status) {
        case "Bad":
            statusWidth = 0.9;
            break;

        case "Mediocre":
            statusWidth = 2.05;
            break;

        case "Good":
            statusWidth = 1.25;
            break;

        case "Great":
            statusWidth = 1.4;
            break;

        default:
            console.warn(`Unknown status "${status}"`);
            break;
    }

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
                    {'Score'}
                    <HoverInfo
                        text={description}
                    />
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
                    <span>
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
