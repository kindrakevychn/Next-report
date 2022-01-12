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
import Indicators, {
    DetectedIndicator,
    ScoreIndicator
} from '../components/indicators';
import {
    getReportData
} from '../lib/valurank';

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
        hash,
        score
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
    } = data.meta;

    return (
        <>
            <div
                className={reportStyles.title}
            >
                {'Detailed report'}
            </div>
            <Share
                articleTitle={'Article Title'}
                score={score}
                reportURL={`https://valurank.com/report/${hash}`}
            />
            <div
                className={reportStyles.row2}
            >
                <div
                    className={reportStyles.col}
                >
                    <Indicators>
                        <DetectedIndicator
                            title={'Links to outside resourses'}
                            detected={!!outsideLinks.length}
                            count={outsideLinks.length}
                        />
                        <DetectedIndicator
                            title={'Clickbait'}
                            detected={isClickbait}
                            count={clickbaitElements}
                        />
                        <ScoreIndicator
                            title={'Content coherence'}
                            score={contentCoherence}
                            max={contentCoherenceMax}
                        />
                        <DetectedIndicator
                            title={'Political biases'}
                            detected={isPoliticalBiases}
                            count={politicalBiasesElements}
                        />
                        <DetectedIndicator
                            title={'Insulting speech'}
                            detected={isInsultingSpeech}
                            count={0}
                        />
                        <DetectedIndicator
                            title={'Racial intolerance'}
                            detected={isRacialIntolerance}
                            count={0}
                        />
                        <DetectedIndicator
                            title={'URL media'}
                            detected={haveURLMedia}
                            count={urlMediaCount}
                        />
                    </Indicators>
                </div>
                <div
                    className={reportStyles.col}
                >
                    <Score
                        score={score}
                    />
                    <List
                        title={'Links to outside resourses'}
                        data={outsideLinks}
                        isLink={true}
                    />
                </div>
            </div>
        </>
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
