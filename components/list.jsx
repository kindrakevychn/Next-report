import {
    isAbsoluteURL
} from '../lib/utils';

import buttonStyles from '../styles/button.module.css';
import styles from './list.module.css';

export default function List({
    title,
    data,
    isLink,
    isAbsoluteLink
}) {
    const items = data.map((value, i) => {
        const key = `${i}-${value}`;
        let shortValue = String(value);

        if (shortValue.length > 40) {
            shortValue = `${shortValue.substring(0, 40)}...`;
        }

        if (isAbsoluteLink && !isAbsoluteURL(value)) {
            value = `https://${value}`;
        }

        return (
            <div
                className={styles.item}
                key={key}
            >
                {
                    isLink || isAbsoluteLink ?
                    <a
                        className={buttonStyles.button}
                        href={value}
                        target={'_blank'}
                        rel={'noreferrer noopener'}
                    >
                        {shortValue}
                    </a> :
                    value
                }
            </div>
        );
    });

    return (
        <div
            className={styles.container}
        >
            <div
                className={styles.title}
            >
                {title}
            </div>

            <div
                className={styles.items}
            >
                {items}
            </div>
        </div>
    );
}
