import Navbar from "./navbar";

import styles from "./layout.module.css";
import Footer from "./footer";

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Navbar />

            <main className={styles.main}>{children}</main>

            <Footer />
        </div>
    );
}
