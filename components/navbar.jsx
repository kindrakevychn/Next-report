/* eslint-disable @next/next/no-img-element */

import clsx from 'clsx';

import buttonStyles from '../styles/button.module.css';
import styles from './navbar.module.css';

export default function Navbar() {
    const links = [
        {
            text: 'About us',
            url: 'https://valurank.com/#rec367701551'
        },
        {
            text: 'Add to Chrome for free',
            url: 'https://chrome.google.com/webstore/detail/kkhcmgnlodakongllknldloammpmbpeg',
            isButton: true
        },
    ];

    return (
        <header
            className={styles.container}
        >
            <div>
                <div
                    className={styles.title}
                >
                    {'Valurank'}
                    <span
                        className={styles.logoContainer}
                    >
                        <img
                            src={'/logo.svg'}
                            alt={''}
                            width={16}
                            height={16}
                            decoding={'async'}
                        />
                    </span>
                </div>
            </div>

            <div
                className={styles.links}
            >
                {
                    links.map((link) => (
                        <a
                            key={link.url}
                            className={clsx(
                                buttonStyles.button,
                                styles.link,
                                link.isButton && styles.button
                            )}
                            href={link.url}
                            target={'_blank'}
                            rel={'noreferrer noopener'}
                        >
                            {link.text}
                        </a>
                    ))
                }
            </div>
        </header>
    );
}
