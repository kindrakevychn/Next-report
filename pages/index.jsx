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
        getReportData()
        .then((data) => {
            setReportData(data);
        })
        .catch((err) => {
            setError(String(err));
        });
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
    const {
        id,
        score,
        article,
        meta
    } = data;
    const {
        outsideLinks,
        isClickbait,
        clickbaitElements,
        contentCoherence,
        contentCoherenceMax,
        isPoliticalBiases,
        politicalBiasesElements,
        isInsultingSpeech,
        isRacialIntolerance,
        haveURLMedia,
        urlMediaCount
    } = meta || {};

    return (
        <>
            <Title
                articleTitle={article.title}
                articleURL={article.url}
            />
            <Share
                articleTitle={article.title}
                score={score}
                reportURL={`https://valurank.com/report/${id}`}
            />
            <div
                className={reportStyles.row2}
            >
                <div
                    className={reportStyles.col}
                >
                    <Indicators>
                        {
                            (outsideLinks != null) &&
                            <DetectedIndicator
                                title={'Links to outside resourses'}
                                detected={!!outsideLinks.length}
                                count={outsideLinks.length}
                            />
                        }
                        {
                            (isClickbait != null) &&
                            <DetectedIndicator
                                title={'Clickbait'}
                                detected={isClickbait}
                                count={clickbaitElements}
                            />
                        }
                        {
                            (contentCoherence != null) &&
                            <ScoreIndicator
                                title={'Content coherence'}
                                score={contentCoherence}
                                max={contentCoherenceMax}
                            />
                        }
                        {
                            (isPoliticalBiases != null) &&
                            <DetectedIndicator
                                title={'Political biases'}
                                detected={isPoliticalBiases}
                                count={politicalBiasesElements}
                            />
                        }
                        {
                            (isInsultingSpeech != null) &&
                            <DetectedIndicator
                                title={'Insulting speech'}
                                detected={isInsultingSpeech}
                                count={0}
                            />
                        }
                        {
                            (isRacialIntolerance != null) &&
                            <DetectedIndicator
                                title={'Racial intolerance'}
                                detected={isRacialIntolerance}
                                count={0}
                            />
                        }
                        {
                            (haveURLMedia != null) &&
                            <DetectedIndicator
                                title={'URL media'}
                                detected={haveURLMedia}
                                count={urlMediaCount}
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
                    {
                        (outsideLinks && outsideLinks.length) &&
                        <List
                            title={'Links to outside resourses'}
                            data={outsideLinks}
                            isLink={true}
                        />
                    }
                </div>
            </div>
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
