import {
    useState,
    useEffect
} from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import Layout from '../components/layout';
import ShareButtons from '../components/share-buttons';
import CopyText from '../components/copy-text';
import Score from '../components/score';
import Error from '../components/error';
import List from '../components/list';
import ExtensionBanner from '../components/extension-banner';
import Indicators, {
    NumberIndicator,
    StringIndicator
} from '../components/indicators';
import {
    getReportData,
    INDICATORS
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
                                className={clsx(
                                    buttonStyles.button,
                                    reportStyles.articleLink
                                )}
                                href={articleURL}
                                target={'_blank'}
                                rel={'noreferrer noopener'}
                            >
                                {`"${articleTitle}"`}
                                <OpenInNewIcon />
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
    return (
        <div
            className={reportStyles.row2}
        >
            <div
                className={reportStyles.col}
            >
                <Indicators>
                    {
                        (details.quality != null) &&
                        <NumberIndicator
                            number={details.quality.score}
                            title={INDICATORS.quality.title}
                            max={INDICATORS.quality.maxScore}
                            description={INDICATORS.quality.description}
                        />
                    }
                    {
                        (details.biasedLanguage != null) &&
                        <NumberIndicator
                            number={details.biasedLanguage.score}
                            title={INDICATORS.biasedLanguage.title}
                            max={INDICATORS.biasedLanguage.maxScore}
                            description={INDICATORS.biasedLanguage.description}
                        />
                    }
                    {
                        (details.tone != null) &&
                        <StringIndicator
                            string={details.tone.label}
                            title={INDICATORS.tone.title}
                            description={INDICATORS.tone.description}
                        />
                    }
                    {
                        (details.offensiveLanguage != null) &&
                        <StringIndicator
                            string={details.offensiveLanguage.label}
                            title={INDICATORS.offensiveLanguage.title}
                            description={INDICATORS.offensiveLanguage.description}
                            color={INDICATORS.offensiveLanguage.scoreToColor(details.offensiveLanguage.score)}
                        />
                    }
                    {
                        (details.hateSpeech != null) &&
                        <StringIndicator
                            string={details.hateSpeech.label}
                            title={INDICATORS.hateSpeech.title}
                            description={INDICATORS.hateSpeech.description}
                            color={INDICATORS.hateSpeech.scoreToColor(details.hateSpeech.score)}
                        />
                    }
                    {
                        (details.readability != null) &&
                        <NumberIndicator
                            number={details.readability.score}
                            title={INDICATORS.readability.title}
                            max={INDICATORS.readability.maxScore}
                            description={INDICATORS.readability.description}
                        />
                    }
                    {
                        (details.propagandaLikelihood != null) &&
                        <StringIndicator
                            string={details.propagandaLikelihood.label}
                            title={INDICATORS.propagandaLikelihood.title}
                            description={INDICATORS.propagandaLikelihood.description}
                            color={INDICATORS.propagandaLikelihood.scoreToColor(details.propagandaLikelihood.score)}
                        />
                    }
                    {
                        (
                            details.externalReferences != null &&
                            Array.isArray(details.externalReferences.data)
                        ) &&
                        <StringIndicator
                            string={details.externalReferences.label}
                            title={INDICATORS.externalReferences.title}
                            description={INDICATORS.externalReferences.description}
                            color={INDICATORS.externalReferences.scoreToColor(details.externalReferences.score)}
                        />
                    }
                    {
                        (
                            details.sourceDiversity != null &&
                            Array.isArray(details.sourceDiversity.data)
                        ) &&
                        <StringIndicator
                            string={details.sourceDiversity.label}
                            title={INDICATORS.sourceDiversity.title}
                            description={INDICATORS.sourceDiversity.description}
                            color={INDICATORS.sourceDiversity.scoreToColor(details.sourceDiversity.score)}
                        />
                    }
                    {
                        (
                            details.affiliatedLinks != null &&
                            Array.isArray(details.affiliatedLinks.data)
                        ) &&
                        <StringIndicator
                            string={details.affiliatedLinks.label}
                            title={INDICATORS.affiliatedLinks.title}
                            description={INDICATORS.affiliatedLinks.description}
                            color={INDICATORS.affiliatedLinks.scoreToColor(details.affiliatedLinks.score)}
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
                    (
                        details.externalReferences != null &&
                        Array.isArray(details.externalReferences.data) &&
                        !!details.externalReferences.data.length
                    ) &&
                    <List
                        data={details.externalReferences.data}
                        title={INDICATORS.externalReferences.title}
                        isLink={true}
                    />
                }
                {
                    (
                        details.sourceDiversity != null &&
                        Array.isArray(details.sourceDiversity.data) &&
                        !!details.sourceDiversity.data.length
                    ) &&
                    <List
                        data={details.sourceDiversity.data}
                        title={INDICATORS.sourceDiversity.title}
                        isAbsoluteLink={true}
                    />
                }
                {
                    (
                        details.affiliatedLinks != null &&
                        Array.isArray(details.affiliatedLinks.data) &&
                        !!details.affiliatedLinks.data.length
                    ) &&
                    <List
                        data={details.affiliatedLinks.data}
                        title={INDICATORS.affiliatedLinks.title}
                        isLink={true}
                    />
                }
            </div>
        </div>
    );
}

function OpenInNewIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px'><path d='M0 0h24v24H0z' fill='none'/><path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/></svg>
    );
}
