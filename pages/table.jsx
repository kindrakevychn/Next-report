import Head from "next/head";
import { useState, useEffect } from "react";
import Indicators, { StringIndicator } from "../components/indicators";
import { getReportData, INDICATORS } from "../lib/valurank";

import dataStyles from "./data.module.css";

export default function Index() {
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        let data = undefined;

        try {
            data = getReportData();
        } catch (error) {
            console.error(error);
        }

        if (data) {
            setReportData(data);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{"Valurank Report"}</title>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        _gs('track', '/report/table', 'Report Table');
                        `
                    }}
                />
            </Head>

            <main>
                {reportData && <Report data={reportData} />}
            </main>
        </>
    );
}

function Report({ data }) {
    let { score, details } = data;

    details = details || {};

    return <Data score={score} details={details} />;
}

function Data({ score, details }) {
    return (
        <div className={dataStyles.row2}>
            <div className={dataStyles.col}>
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
                    {details.tone != null && (
                        <StringIndicator
                            value={details.tone.label}
                            title={INDICATORS.tone.title}
                            description={INDICATORS.tone.description}
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
                                titleLeftPadding
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
                                titleLeftPadding
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
                                titleLeftPadding
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
                                titleLeftPadding
                                isNumber
                            />
                        )}
                    {details.textLanguage != null &&
                        details.textLanguage.score >= 50 && (
                            <StringIndicator
                                value={details.textLanguage.label}
                                title={INDICATORS.textLanguage.title}
                                description={
                                    INDICATORS.textLanguage.description
                                }
                            />
                        )}
                    {details.readability != null && (
                        <StringIndicator
                            value={details.readability.score}
                            title={INDICATORS.readability.title}
                            max={INDICATORS.readability.maxScore}
                            description={INDICATORS.readability.description}
                            isNumber
                            boldTitle
                            thickBorder
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
                    {details.timeValue != null && (
                        <StringIndicator
                            value={details.timeValue.label}
                            title={INDICATORS.timeValue.title}
                            description={INDICATORS.timeValue.description}
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
                                links={details.externalReferences.data}
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
                                links={details.sourceDiversity.data}
                                convertToAbsoluteLinks
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
                                links={details.affiliatedLinks.data}
                            />
                        )}
                </Indicators>
            </div>
        </div>
    );
}
