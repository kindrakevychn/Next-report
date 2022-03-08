import { useState } from "react";
import clsx from "clsx";
import HoverInfo from "./hover-info";

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
    detailList = [],
}) {
    const [open, setOpen] = useState(false);

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
                    className={styles.value}
                    onClick={() => setOpen((o) => !o)}
                >
                    {value}
                    {detailList.length > 0 && (
                        <span>
                            <ArrowDown rotate={open} />
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.details}>
                {detailList.length > 0 &&
                    open &&
                    detailList.map((detail) => (
                        <div key={detail}>
                            <a
                                href={detail}
                                target={"_blank"}
                                rel={"noreferrer noopener"}
                            >
                                {detail}
                            </a>
                        </div>
                    ))}
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
            className={rotate && styles.rotate}
        >
            <path d="M7 8L0.937822 0.5L13.0622 0.500001L7 8Z" fill="#2379C4" />
        </svg>
    );
}
