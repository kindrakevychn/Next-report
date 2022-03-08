import {
    scoreToStatus,
    scoreToColor,
    scoreToDescription,
} from "../../lib/valurank";
import HoverInfo from "./hover-info";
import styles from "./score.module.css";

export default function Score({ score }) {
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
        "--score": score,
        "--statusWidth": statusWidth,
        "--sliderColor": sliderColor,
    };

    return (
        <div className={styles.container} style={containerStyle}>
            <div className={styles.header}>
                <HoverInfo text={description}>
                    <div className={styles.title}>{"Score"}</div>
                </HoverInfo>

                <div className={styles.score}>
                    <span className={styles.dot} />
                    {score}
                    <span className={styles.divider}>{"/100"}</span>
                </div>
            </div>

            <div className={styles.chart}>
                <div className={styles.status}>
                    <span>{status}</span>
                </div>

                <div className={styles.slider} />

                <div className={styles.scale}>
                    <div className={styles.labels}>
                        <span>{"Bad"}</span>
                        <span>{"Good"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
