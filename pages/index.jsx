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
    const {
        quality,
        biasedLanguage,
        propagandaLikelihood,
        affiliatedLinks,
        hateSpeech,
        offensiveLanguage,
        tone,
        readability
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
                            title={'Dispassionate language'}
                            score={quality.score}
                            max={100}
                            status={quality.label}
                            description={DESCRIPTION.quality}
                        />
                    }
                    {
                        (biasedLanguage != null) &&
                        <ScoreIndicator
                            title={'Subjectivitiy'}
                            score={biasedLanguage.score}
                            max={100}
                            status={biasedLanguage.label}
                            description={DESCRIPTION.biasedLanguage}
                        />
                    }
                    {
                        (propagandaLikelihood != null) &&
                        <ScoreIndicator
                            title={'Use of propaganda techniques'}
                            score={propagandaLikelihood.score}
                            max={100}
                            status={propagandaLikelihood.label}
                            description={DESCRIPTION.propagandaLikelihood}
                        />
                    }
                    {
                        (
                            affiliatedLinks != null &&
                            Array.isArray(affiliatedLinks.data)
                        ) &&
                        <DetectedIndicator
                            title={'Affiliate links'}
                            detected={!!affiliatedLinks.data.length}
                            count={affiliatedLinks.data.length}
                            description={DESCRIPTION.affiliatedLinks}
                        />
                    }
                    {
                        (hateSpeech != null) &&
                        <ScoreIndicator
                            title={'Hate speech'}
                            score={hateSpeech.score}
                            max={100}
                            status={hateSpeech.label}
                        />
                    }
                    {
                        (offensiveLanguage != null) &&
                        <ScoreIndicator
                            title={'Offensive language'}
                            score={offensiveLanguage.score}
                            max={100}
                            status={offensiveLanguage.label}
                            description={DESCRIPTION.offensiveLanguage}
                        />
                    }
                    {
                        (tone != null) &&
                        <ScoreIndicator
                            title={'Tone'}
                            score={tone.score}
                            max={100}
                            status={tone.label}
                        />
                    }
                    {
                        (readability != null) &&
                        <ScoreIndicator
                            title={'Language complexity'}
                            score={readability.score}
                            max={100}
                            description={DESCRIPTION.readability}
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
                        affiliatedLinks != null &&
                        Array.isArray(affiliatedLinks.data) &&
                        !!affiliatedLinks.data.length
                    ) &&
                    <List
                        title={"Affiliated links"}
                        data={affiliatedLinks.data}
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

const DESCRIPTION = {
    quality: `A supervised NLP model trained to rank articles along a continuum ranging from\npurely-informative (like encyclopedia entries) to pure-conjecture (like fake news or\nfan fiction). This score tends to have an inverse correlation with the level of\n"opinionatedness" the article's author exhibits in his/her writing, i.e. editorials and\nopinion pieces will generally score lower than factual news reports.`,
    biasedLanguage: `A supervised NLP model trained on a dataset of wikipedia edits rejected for being subjective\nor exhibiting bias. The scale here is inverted, i.e. a higher score means LESS subjectivity/bias.`,
    propagandaLikelihood: `A supervised NLP model trained on the QCRI dataset of known 17 known propaganda techniques\nthat are used by repressive governments and state news agencies. The scale here is inverted,\ni.e. a higher score means LOWER likelihood that propaganda techniques were used by the author.`,
    affiliatedLinks: `The number of affiliate links on the page (i.e. links that will take the reader to the\nlanding page of an online store or commercial service, and from which the writer\nwill receive an affiliate fee or other commercial incentive). Any number other than 0\ngenerally indicates that the writer of the article has a financial interest and does not\nmerely seek to inform the reader.`,
    offensiveLanguage: `A supervised NLP model trained to detect offensive language\nin all its common varieties - insults, threats, racism, etc.`,
    readability: `A measurement of the complexity of the language used. This model roughly\ncorresponds to the "grade-level" ranking used by many creator tools, but has\nbeen calibrated to work better for the type of content generally found online.`
};
