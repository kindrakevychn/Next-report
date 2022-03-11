import styles from "./footer.module.css";

export default function Footer() {
    const links = [
        {
            text: "About us",
            url: "https://valurank.com/#rec367701551",
        },
        {
            text: "Terms & Conditions",
            url: "https://chrome.google.com/webstore/detail/kkhcmgnlodakongllknldloammpmbpeg",
        },
    ];

    return (
        <footer className={styles.container}>
            {links.map((link) => (
                <a
                    key={link.url}
                    href={link.url}
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                >
                    {link.text}
                </a>
            ))}
        </footer>
    );
}
