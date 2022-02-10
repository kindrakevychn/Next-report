import clsx from 'clsx';
import {
    scoreToColor,
    scoreToStatus
} from '../lib/valurank';
import HoverInfo from './hover-info';

import styles from './indicators.module.css';

export default function Indicators({children}) {
    return (
        <div
            className={styles.container}
        >
            <table
                className={styles.table}
            >
                <thead
                    className={styles.head}
                >
                    <Head />
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}

function Head() {
    const data = [
        'Indicators',
        'Results'
    ];

    return (
        <tr
            className={styles.row}
        >
            {
                data.map((value, i) => (
                    <th
                        className={styles.data}
                        key={`${i}-${value}`}
                    >
                        {value}
                    </th>
                ))
            }
        </tr>
    );
}

export function DetectedIndicator({
    title,
    detected,
    count,
    description
}) {
    const elementsText = (
        (count === 1) ?
        'element' :
        'elements'
    );
    const data = [
        title || '',
        (detected ? 'Detected' : 'Not Detected'),
        ((count != null) ? `${count} ${elementsText}` : '')
    ];

    return (
        <tr
            className={clsx(
                styles.row,
                styles.detected,
                detected && styles.detectedYes
            )}
        >
            {
                data.map((value, i) => (
                    <td
                        className={styles.data}
                        key={`${i}-${value}`}
                    >
                        <span
                            className={styles.text}
                        >
                            {value}
                            {
                                (i === 0) && description &&
                                <HoverInfo
                                    text={description}
                                />
                            }
                        </span>
                    </td>
                ))
            }
        </tr>
    );
}

export function ScoreIndicator({
    title,
    score,
    max,
    status,
    description
}) {
    title = title || '';
    score = score || 0;
    max = max || 0;
    status = status || scoreToStatus(score);

    const color = scoreToColor(score);
    const data = [
        title,
        status,
        `${score}/${max}`
    ];

    return (
        <tr
            className={clsx(
                styles.row,
                styles.score
            )}
            style={{
                '--color': color
            }}
        >
            {
                data.map((value, i) => (
                    <td
                        className={styles.data}
                        key={`${i}-${value}`}
                    >
                        <span
                            className={styles.text}
                        >
                            {value}
                            {
                                (i === 0) && description &&
                                <HoverInfo
                                    text={description}
                                />
                            }
                        </span>
                    </td>
                ))
            }
        </tr>
    );
}

export function NumberIndicator({
    title,
    number,
    max,
    description
}) {
    title = title || '';
    number = number || -1;

    let numberStr = '';

    if (max != null) {
        numberStr = `${number}/${max}`;
    } else {
        numberStr = String(number);
    }

    const data = [
        title,
        numberStr
    ];

    return (
        <tr
            className={clsx(
                styles.row,
                styles.number
            )}
        >
            {
                data.map((value, i) => (
                    <td
                        className={styles.data}
                        key={`${i}-${value}`}
                    >
                        <span
                            className={styles.text}
                        >
                            {value}
                            {
                                (i === 0) && description &&
                                <HoverInfo
                                    text={description}
                                />
                            }
                        </span>
                    </td>
                ))
            }
        </tr>
    );
}

export function StringIndicator({
    title,
    string,
    description
}) {
    title = title || '';
    string = string || '';

    const data = [
        title,
        string
    ];

    return (
        <tr
            className={clsx(
                styles.row,
                styles.string
            )}
        >
            {
                data.map((value, i) => (
                    <td
                        className={styles.data}
                        key={`${i}-${value}`}
                    >
                        <span
                            className={styles.text}
                        >
                            {value}
                            {
                                (i === 0) && description &&
                                <HoverInfo
                                    text={description}
                                />
                            }
                        </span>
                    </td>
                ))
            }
        </tr>
    );
}
