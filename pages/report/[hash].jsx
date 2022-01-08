import {
    useRouter
} from 'next/router';
import Layout from '../../components/layout';

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

            <div>
                {'share with'}
            </div>

            <div>
                {`Valurank score for ${hash} is 0/100.`}
            </div>
        </Layout>
    );
}
