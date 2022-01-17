import buttonStyles from '../styles/button.module.css';
import styles from './navbar.module.css';

export default function Navbar() {
    const links = [
        {
            text: 'About us',
            url: 'https://valurank.com/#rec367701551'
        },
        {
            text: 'Download',
            url: 'https://chrome.google.com/webstore/detail/kkhcmgnlodakongllknldloammpmbpeg'
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
                </div>
            </div>

            <div
                className={styles.links}
            >
                {
                    links.map((link) => (
                        <a
                            key={link.url}
                            className={`${buttonStyles.button} ${styles.link}`}
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
