import {
    useRouter
} from 'next/router';
import Layout from '../components/layout';
import ShareButtons from '../components/share-buttons';
import CopyText from '../components/copy-text';

import reportStyles from './report.module.css';
import shareStyles from './share.module.css';

export default function Report() {
    const router = useRouter();
    const {hash} = router.query;

    return (
        <Layout>
            <div
                className={reportStyles.title}
            >
                {'Detailed report'}
            </div>

            <Share
                articleTitle={'Article Title'}
                score={78}
                reportURL={`https://valurank.com/report/${hash}`}
            />

            <div>
                {`Valurank score for ${hash} is 0/100.`}
            </div>
        </Layout>
    );
}

function Share({
    articleTitle,
    score,
    reportURL
}) {
    return (
        <div
            className={shareStyles.container}
        >
            <div
                className={shareStyles.action}
            >
                {'Share with'}
            </div>
            <ShareButtons
                articleTitle={articleTitle}
                score={score}
                reportURL={reportURL}
            />
            <div
                className={shareStyles.separator}
            />
            <CopyText
                text={reportURL}
            />
        </div>
    );
}
