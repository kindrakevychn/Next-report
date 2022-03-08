import styles from "./hover-info.module.css";

export default function HoverInfo({ text, children }) {
    return (
        <div className={styles.container}>
            {children}
            <span>{text}</span>
        </div>
    );
}
