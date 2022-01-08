import {
    useRouter
} from 'next/router';
import Layout from '../../components/layout';
import ShareButtons from '../../components/share-buttons';

import styles from './report.module.css';

export default function Report() {
    const router = useRouter();
    const {hash} = router.query;

    return (
        <Layout>
            <div
                className={styles.title}
            >
                {'Detailed report'}
            </div>

            <div
                className={styles.share}
            >
                <div
                    className={styles.shareTitle}
                >
                    {'Share with'}
                </div>

                <ShareButtons
                    articleTitle={"Article Title"}
                    score={78}
                    reportURL={`https://valurank.com/report/${hash}`}
                />
            </div>

            <div>
                {`Valurank score for ${hash} is 0/100.`}
            </div>
        </Layout>
    );
}
