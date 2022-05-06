/* eslint-disable @next/next/no-img-element */

import clsx from "clsx";

import buttonStyles from "../styles/button.module.css";
import styles from "./navbar.module.css";

export default function Navbar() {
    const link = {
        text: "Add to Chrome",
        url: "https://chrome.google.com/webstore/detail/kkhcmgnlodakongllknldloammpmbpeg",
    };

    return (
        <header className={styles.container}>
            <div>
                <div className={styles.title}>
                    <img
                        src={"/logo-text.svg"}
                        alt={"ValuRank"}
                        decoding={"async"}
                    />
                </div>
            </div>

            <div className={styles.links}>
                <a
                    className={clsx(buttonStyles.button, styles.button)}
                    href={link.url}
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                    onClick={() =>
                        _gs("event", `Report: Clicked "Add to Chrome" (Top)`)
                    }
                >
                    {link.text}
                </a>
            </div>
        </header>
    );
}
