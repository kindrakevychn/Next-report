import buttonStyles from "../styles/button.module.css";
import styles from "./extension-banner.module.css";

export default function ExtensionBanner() {
    const chromeLink =
        "https://chrome.google.com/webstore/detail/kkhcmgnlodakongllknldloammpmbpeg";

    return (
        <div className={styles.container}>
            {"Want to see more?"}
            &nbsp;
            <a
                title={"Install on Google Chrome"}
                className={buttonStyles.button}
                href={chromeLink}
                target={"_blank"}
                rel={"noreferrer noopener"}
            >
                {"Get the extension!"}
            </a>
        </div>
    );
}
