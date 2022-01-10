import styles from './error.module.css';

export default function Error({message}) {
    return (
        <div
            className={styles.message}
        >
            {message}
        </div>
    );
}
