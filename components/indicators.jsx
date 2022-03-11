import {
    useState,
    useCallback
} from "react";
import clsx from "clsx";
import {
    isAbsoluteURL
} from '../lib/utils';
import HoverInfo from "./hover-info";

import buttonStyles from '../styles/button.module.css';
import styles from "./indicators.module.css";

export default function Indicators({ children }) {
    return (
        <div className={styles.container}>
            <div className={styles.head}>{"Content Analysis"}</div>
            {children}
        </div>
    );
}

export function StringIndicator({
    title,
    value,
    description,
    color,
    titleLeftPadding,
    isNumber = false,
    thickBorder = false,
    boldTitle = false,
    links = [],
    convertToAbsoluteLinks
}) {
    const [open, setOpen] = useState(false);
    const onValueClick = useCallback(() => {
        setOpen((v) => !v);
    }, []);

    return (
        <>
            <div
                className={clsx(
                    styles.row,
                    isNumber && styles.number,
                    titleLeftPadding && styles.dataLeftMargin,
                    thickBorder && styles.thickBorder,
                    boldTitle && styles.boldTitle
                )}
                style={{
                    "--color": color,
                }}
            >
                <HoverInfo text={description}>
                    <div className={styles.title}>{title}</div>
                </HoverInfo>

                <div
                    className={clsx(
                        links.length > 0 && buttonStyles.button,
                        styles.value
                    )}
                    onClick={onValueClick}
                >
                    {value}
                    {
                        links.length > 0 &&
                        <span>
                            <ArrowDown rotate={open} />
                        </span>
                    }
                </div>
            </div>

            <div className={styles.links}>
                {
                    links.length > 0 &&
                    open &&
                    links.map((link) => {
                        let href = link;

                        if (convertToAbsoluteLinks && !isAbsoluteURL(href)) {
                            href = `https://${href}`;
                        }

                        return (
                            <div key={link}>
                                <a
                                    className={clsx(
                                        buttonStyles.button
                                    )}
                                    href={href}
                                    target={"_blank"}
                                    rel={"noreferrer noopener"}
                                >
                                    {link}
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

function ArrowDown({ rotate }) {
    return (
        <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                rotate && styles.rotate
            )}
        >
            <path d="M7 8L0.937822 0.5L13.0622 0.500001L7 8Z" fill="#2379C4" />
        </svg>
    );
}
