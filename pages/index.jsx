import {
    useState,
    useEffect
} from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import ShareButtons from '../components/share-buttons';
import CopyText from '../components/copy-text';
import Error from '../components/error';
import List from '../components/list';
import {
    getReportData
} from '../lib/valurank';

import reportStyles from './report.module.css';
import shareStyles from './share.module.css';
import scoreStyles from './score.module.css';

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
        outsideLinks
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
            <Score
                score={score}
            />
            <List
                title={'Links to outside resourses'}
                data={outsideLinks}
                isLink={true}
            />
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

function Score({score}) {
    let status = '';
    let title = '';

    // Width of text is not persistent, but we need element width
    // to calculate its left margin. We will use approximate width
    // in order to not overcomplicate things.
    // Relative to 1rem.
    let statusWidth = 0;

    if (score < 35) {
        status = "Bad";
        statusWidth = 0.9;
        title = (
            `"Bad" means our model analyzed this article and found that it\n` +
            "is nearly devoid of any informative value. Scores in this range\n" +
            "are typical in fake/satire news outlets, marketing or advertising\n" +
            `copy, pure propaganda, or conspiracy theorists' websites.\n` +
            "Our model has no way to distinguish satire from intentionally\n" +
            "misleading materials, and therefore penalizes both to the same\n" +
            "degree (based on text alone)."
        );
    } else if (score < 65) {
        status = "Mediocre";
        statusWidth = 2.05;
        title = (
            `"Mediocre" means our model analyzed the article and found that it\n` +
            "mixes some informative elements with A LOT of negative persuasion\n" +
            "techniques, aiming primarily to persuade (not inform) the reader.\n" +
            "Scores in this range are typical in partisan or agenda-driven websites,\n" +
            "and are often seen in some of the subtler propaganda campaigns."
        );
    } else if (score < 85) {
        status = "Good";
        statusWidth = 1.25;
        title = (
            `"Good" means our model analyzed the article's text and found that it\n` +
            "mixes informative elements with persuasive elements, aiming both to\n" +
            "inform and to sway the reader's opinion in some direction. In other\n" +
            "words, this article was penalized for using some unnecessary flourishes\n" +
            "(e.g. subjective language, biased presuppositions, hyperbolic choice of\n" +
            "words, etc) that a purely-informative article would generally avoid.\n" +
            "Scores in this range are typical for editorials or opinion articles."
        );
    } else {
        status = "Great";
        statusWidth = 1.4;
        title = (
            `"Great" means our model analyzed the article's text and found that it\n` +
            "is a) informative, and b) does not contain any negative elements that\n" +
            "attempt to persuade or trick the reader. Scores in this range are\n" +
            "typical for encyclopedia entries or strictly-factual news reports."
        );
    }

    let sliderColor = '';

    if (score < 20) {
        sliderColor = '#EE5339';
    } else if (score < 40) {
        sliderColor = '#F38E3A';
    } else if (score < 60) {
        sliderColor = '#F6D243';
    } else if (score < 80) {
        sliderColor = '#CDD649';
    } else {
        sliderColor = '#5BAE50';
    }

    const containerStyle = {
        '--score': score,
        '--statusWidth': statusWidth,
        '--sliderColor': sliderColor
    };

    return (
        <div
            className={scoreStyles.container}
            style={containerStyle}
        >
            <div
                className={scoreStyles.header}
            >
                <div
                    className={scoreStyles.title}
                >
                    {'Valurank'}
                </div>

                <div
                    className={scoreStyles.score}
                >
                    <span
                        className={scoreStyles.dot}
                    />
                    {`${score}/100`}
                </div>
            </div>

            <div
                className={scoreStyles.chart}
            >
                <div
                    className={scoreStyles.status}
                >
                    <span
                        title={title}
                    >
                        {status}
                    </span>
                </div>

                <div
                    className={scoreStyles.slider}

                />

                <div
                    className={scoreStyles.scale}
                >
                    <ScaleIcon />
                </div>

                <div
                    className={scoreStyles.labels}
                >
                    <span>
                        {'Bad'}
                    </span>
                    <span>
                        {'Great'}
                    </span>
                </div>
            </div>
        </div>
    );
}

function ScaleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="415" height="24" viewBox="0 0 415 24" fill="none">
            <g filter="url(#filter0_d_104_6209)">
                <rect x="0" y="0" width="415" height="24" rx="12" fill="url(#paint0_linear_104_6209)" />
            </g>
            <defs>
                <filter id="filter0_d_104_6209" x="0" y="0" width="415" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_104_6209" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_104_6209" x1="415" y1="24" x2="5.2742" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00A35E" />
                    <stop offset="0.473958" stopColor="#E6E939" />
                    <stop offset="1" stopColor="#FF0000" />
                </linearGradient>
            </defs>
        </svg>
    );
}
