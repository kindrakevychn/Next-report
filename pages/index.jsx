import {
    useState,
    useEffect
} from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import ShareButtons from '../components/share-buttons';
import CopyText from '../components/copy-text';
import Score from '../components/score';
import Error from '../components/error';
import List from '../components/list';
import ExtensionBanner from '../components/extension-banner';
import Indicators, {
    DetectedIndicator,
    ScoreIndicator
} from '../components/indicators';
import {
    getReportData
} from '../lib/valurank';

import buttonStyles from '../styles/button.module.css';
import reportStyles from './report.module.css';
import shareStyles from './share.module.css';

export default function Index() {
    const [error, setError] = useState('');
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        const data = getReportData();
        setReportData(data);
    }, []);

    return (
        <>
            <Head>
                <title>
                    {'Valurank Report'}
                </title>
            </Head>

            <Layout>
                {
                    error &&
                    <Error
                        message={error}
                    />
                }
                {
                    reportData &&
                    <Report
                        data={reportData}
                    />
                }
            </Layout>
        </>
    );
}

function Report({data}) {
    let {
        id,
        score,
        article,
        details
    } = data;

    article = article || {};
    details = details || {};

    const reportURL = `${document.location.origin}/${id}`;

    return (
        <>
            <Title
                articleTitle={article.title}
                articleURL={article.url}
            />
            <Share
                articleTitle={article.title}
                score={score}
                reportURL={reportURL}
            />
            <Data
                score={score}
                details={details}
            />
            <div
                className={reportStyles.bannerSeparator}
            />
            <ExtensionBanner />
        </>
    );
}

function Title({
    articleTitle,
    articleURL
}) {
    if (articleTitle && articleTitle.length > 400) {
        articleTitle = articleTitle.substring(0, 400) + "...";
    }

    return (
        <div
            className={reportStyles.title}
        >
            {'Detailed report'}
            {
                articleTitle &&
                <>
                    &nbsp;
                    {'on'}
                    &nbsp;
                    <span
                        className={reportStyles.articleTitle}
                    >
                        {
                            articleURL ?
                            <a
                                className={buttonStyles.button}
                                href={articleURL}
                                target={'_blank'}
                                rel={'noreferrer noopener'}
                            >
                                {`"${articleTitle}"`}
                            </a> :
                            `"${articleTitle}"`
                        }
                    </span>
                </>
            }
        </div>
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

function Data({
    score,
    details
}) {
    const {
        quality,
        biasedLanguage,
        propagandaLikelihood
    } = details;

    return (
        <div
            className={reportStyles.row2}
        >
            <div
                className={reportStyles.col}
            >
                <Indicators>
                    {
                        (quality != null) &&
                        <ScoreIndicator
                            title={'Quality'}
                            score={quality.score}
                            max={100}
                            status={quality.label}
                        />
                    }
                    {
                        (biasedLanguage != null) &&
                        <ScoreIndicator
                            title={'Biased language'}
                            score={biasedLanguage.score}
                            max={100}
                            status={biasedLanguage.label}
                        />
                    }
                    {
                        (propagandaLikelihood != null) &&
                        <ScoreIndicator
                            title={'Propaganda likelihood'}
                            score={propagandaLikelihood.score}
                            max={100}
                            status={propagandaLikelihood.label}
                        />
                    }
                </Indicators>
            </div>
            <div
                className={reportStyles.col}
            >
                <Score
                    score={score}
                />
            </div>
        </div>
    );
}
