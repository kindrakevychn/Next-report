import clsx from 'clsx';

import buttonStyles from '../styles/button.module.css';
import styles from './navbar.module.css';

export default function Navbar() {
    return (
        <header
            className={styles.container}
        >
            <div>
                <div
                    className={styles.title}
                >
                    {'Valurank'}
                </div>
            </div>

            <div
                className={styles.links}
            >
                <a
                    className={clsx(buttonStyles.button, styles.link)}
                    href={'https://valurank.com/#rec367701551'}
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                >
                    {'About us'}
                </a>

                <a
                    className={clsx(buttonStyles.button, styles.link)}
                    href={'https://chrome.google.com/webstore/detail/kkhcmgnlodakongllknldloammpmbpeg'}
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                >
                    {'Download'}
                </a>
            </div>
        </header>
    );
}
