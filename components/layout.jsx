import Navbar from './navbar';

import styles from './layout.module.css';

export default function Layout({
    children
}) {
    return (
        <div>
            <Navbar />

            <main
                className={styles.main}
            >
                {children}
            </main>
        </div>
    );
}
