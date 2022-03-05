import { useState, useEffect } from "react";
import clsx from "clsx";
import Head from "next/head";
import Layout from "../../components/new/layout";
import ShareButtons from "../../components/new/share-buttons";
import CopyText from "../../components/new/copy-text";
import Score from "../../components/new/score";
import Error from "../../components/error";
import ExtensionBanner from "../../components/new/extension-banner";
import Indicators, { StringIndicator } from "../../components/new/indicators";
import { getReportData, INDICATORS } from "../../lib/valurank";

import buttonStyles from "../../styles/button.module.css";
import reportStyles from "./report.module.css";
import shareStyles from "./share.module.css";

export default function Index() {
    const [error, setError] = useState("");
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        const data = getReportData();
        console.log("data", data);
        setReportData(data);
    }, []);

    return (
        <>
            <Head>
                <title>{"Valurank Report"}</title>
            </Head>

            <Layout>
                {error && <Error message={error} />}
                {reportData && <Report data={reportData} />}
            </Layout>
        </>
    );
}

function Report({ data }) {
    let { id, score, article, details } = data;

    article = article || {};
    details = details || {};

    const reportURL = `${document.location.origin}/${id}`;

    return (
        <>
            <Title articleTitle={article.title} articleURL={article.url} />
            <Score score={score} />
            <Share
                articleTitle={article.title}
                score={score}
                reportURL={reportURL}
            />
            <Data score={score} details={details} />
            <div className={reportStyles.bannerSeparator} />
            <ExtensionBanner />
        </>
    );
}

function Title({ articleTitle, articleURL }) {
    if (articleTitle && articleTitle.length > 400) {
        articleTitle = articleTitle.substring(0, 400) + "...";
    }

    const domain = new URL(articleURL).hostname.replace("www.", "");

    return (
        <div>
            <div className={reportStyles.subTitle}>
                {`Report for the ${domain} article:`}
            </div>
            {articleTitle && (
                <span className={reportStyles.articleTitle}>
                    <a
                        className={clsx(
                            buttonStyles.button,
                            reportStyles.articleLink
                        )}
                        href={articleURL ?? "#"}
                        target={"_blank"}
                        rel={"noreferrer noopener"}
                    >
                        {articleTitle}
                    </a>
                </span>
            )}
        </div>
    );
}

function Share({ articleTitle, score, reportURL }) {
    return (
        <div className={shareStyles.container}>
            <CopyText text={reportURL} />
            <ShareButtons
                articleTitle={articleTitle}
                score={score}
                reportURL={reportURL}
            />
        </div>
    );
}

function Data({ score, details }) {
    console.log("details", details);
    return (
        <div className={reportStyles.row2}>
            <div className={reportStyles.col}>
                <Indicators>
                    {details.quality != null && (
                        <StringIndicator
                            value={details.quality.score}
                            title={INDICATORS.quality.title}
                            max={INDICATORS.quality.maxScore}
                            description={INDICATORS.quality.description}
                            boldTitle
                            isNumber
                        />
                    )}
                    {details.biasedLanguage != null && (
                        <StringIndicator
                            value={details.biasedLanguage.score}
                            title={INDICATORS.biasedLanguage.title}
                            max={INDICATORS.biasedLanguage.maxScore}
                            description={INDICATORS.biasedLanguage.description}
                            boldTitle
                            thickBorder
                            isNumber
                        />
                    )}
                    {details.languageStats != null &&
                        details.languageStats.data != null &&
                        details.languageStats.data.properNouns != null && (
                            <StringIndicator
                                value={INDICATORS.languageStats.toString(
                                    details.languageStats.data.properNouns
                                )}
                                title={
                                    INDICATORS.languageStats.data.properNouns
                                        .title
                                }
                                description={
                                    INDICATORS.languageStats.data.properNouns
                                        .description
                                }
                                titleLeftPadding={true}
                                isNumber
                            />
                        )}
                    {details.languageStats != null &&
                        details.languageStats.data != null &&
                        details.languageStats.data.pronouns != null && (
                            <StringIndicator
                                value={INDICATORS.languageStats.toString(
                                    details.languageStats.data.pronouns
                                )}
                                title={
                                    INDICATORS.languageStats.data.pronouns.title
                                }
                                description={
                                    INDICATORS.languageStats.data.pronouns
                                        .description
                                }
                                titleLeftPadding={true}
                                isNumber
                            />
                        )}
                    {details.languageStats != null &&
                        details.languageStats.data != null &&
                        details.languageStats.data.adjectives != null && (
                            <StringIndicator
                                value={INDICATORS.languageStats.toString(
                                    details.languageStats.data.adjectives
                                )}
                                title={
                                    INDICATORS.languageStats.data.adjectives
                                        .title
                                }
                                description={
                                    INDICATORS.languageStats.data.adjectives
                                        .description
                                }
                                titleLeftPadding={true}
                                isNumber
                            />
                        )}
                    {details.languageStats != null &&
                        details.languageStats.data != null &&
                        details.languageStats.data.adverbs != null && (
                            <StringIndicator
                                value={INDICATORS.languageStats.toString(
                                    details.languageStats.data.adverbs
                                )}
                                title={
                                    INDICATORS.languageStats.data.adverbs.title
                                }
                                description={
                                    INDICATORS.languageStats.data.adverbs
                                        .description
                                }
                                titleLeftPadding={true}
                                isNumber
                            />
                        )}
                    {details.tone != null && (
                        <StringIndicator
                            value={details.tone.label}
                            title={INDICATORS.tone.title}
                            description={INDICATORS.tone.description}
                        />
                    )}
                    {details.offensiveLanguage != null && (
                        <StringIndicator
                            value={details.offensiveLanguage.label}
                            title={INDICATORS.offensiveLanguage.title}
                            description={
                                INDICATORS.offensiveLanguage.description
                            }
                            color={INDICATORS.offensiveLanguage.scoreToColor(
                                details.offensiveLanguage.score
                            )}
                            thickBorder
                            boldTitle
                        />
                    )}
                    {details.hateSpeech != null && (
                        <StringIndicator
                            value={details.hateSpeech.label}
                            title={INDICATORS.hateSpeech.title}
                            description={INDICATORS.hateSpeech.description}
                            color={INDICATORS.hateSpeech.scoreToColor(
                                details.hateSpeech.score
                            )}
                        />
                    )}
                    {details.readability != null && (
                        <StringIndicator
                            value={details.readability.score}
                            title={INDICATORS.readability.title}
                            max={INDICATORS.readability.maxScore}
                            description={INDICATORS.readability.description}
                            isNumber
                        />
                    )}
                    {details.clickbait != null && (
                        <StringIndicator
                            value={details.clickbait.label}
                            title={INDICATORS.clickbait.title}
                            description={INDICATORS.clickbait.description}
                            color={INDICATORS.clickbait.scoreToColor(
                                details.clickbait.score
                            )}
                        />
                    )}
                    {details.propagandaLikelihood != null && (
                        <StringIndicator
                            value={details.propagandaLikelihood.label}
                            title={INDICATORS.propagandaLikelihood.title}
                            description={
                                INDICATORS.propagandaLikelihood.description
                            }
                            color={INDICATORS.propagandaLikelihood.scoreToColor(
                                details.propagandaLikelihood.score
                            )}
                        />
                    )}
                    {details.externalReferences != null &&
                        Array.isArray(details.externalReferences.data) && (
                            <StringIndicator
                                value={details.externalReferences.label}
                                title={INDICATORS.externalReferences.title}
                                description={
                                    INDICATORS.externalReferences.description
                                }
                                color={INDICATORS.externalReferences.scoreToColor(
                                    details.externalReferences.score
                                )}
                                thickBorder
                                detailList={details.externalReferences.data}
                            />
                        )}
                    {details.sourceDiversity != null &&
                        Array.isArray(details.sourceDiversity.data) && (
                            <StringIndicator
                                value={details.sourceDiversity.label}
                                title={INDICATORS.sourceDiversity.title}
                                description={
                                    INDICATORS.sourceDiversity.description
                                }
                                color={INDICATORS.sourceDiversity.scoreToColor(
                                    details.sourceDiversity.score
                                )}
                                detailList={details.sourceDiversity.data}
                            />
                        )}
                    {details.affiliatedLinks != null &&
                        Array.isArray(details.affiliatedLinks.data) && (
                            <StringIndicator
                                value={details.affiliatedLinks.label}
                                title={INDICATORS.affiliatedLinks.title}
                                description={
                                    INDICATORS.affiliatedLinks.description
                                }
                                color={INDICATORS.affiliatedLinks.scoreToColor(
                                    details.affiliatedLinks.score
                                )}
                                detailList={details.affiliatedLinks.data}
                            />
                        )}
                </Indicators>
            </div>
        </div>
    );
}
