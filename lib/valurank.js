import {
    isDevelopment
} from './env';

export function getReportData() {
    // Keep in mind that every field is optional.
    // Only required fields are `id`, `score`.
    const data = {
        id: 'G5CJe4b5',
        score: 76,
        article: {
            title: "A few bytes here, a few there, pretty soon you're talking real memory",
            url: 'https://dave.cheney.net/2021/01/05/a-few-bytes-here-a-few-there-pretty-soon-youre-talking-real-memory'
        },
        details: {
            quality: {
                score: 91,
                label: 'excellent'
            },
            biasedLanguage: {
                score: 65,
                label: 'mostly neutral'
            },
            propagandaLikelihood: {
                score: 60,
                label: 'not detected'
            },
            offensiveLanguage: {
                score: 93,
                label: 'not offensive'
            },
            hateSpeech: {
                score: 99,
                label: 'not hateful'
            },
            tone: {
                score: 63,
                label: 'neutral'
            },
            affiliatedLinks: {
                score: 0,
                label: '2 affiliate links',
                data: [
                    'https://www.amazon.com/dp/B0863FR3S9?tag=digitrend08sub4-20&linkCode=ogi&th=1&psc=1&_keeptag=1',
                    'https://s.click.aliexpress.com/e/_9vnl2Z?af=&amp;cn=5&amp;cv=2805&amp'
                ]
            },
            readability: {
                score: 48
            },
            externalReferences: {
                score: 80,
                label: '4 external sources',
                data: [
                    'https://www.nature.com/articles/s41591-022-01689-3#MOESM1',
                    'https://www.medrxiv.org/content/10.1101/2021.12.27.21268448v1.full.pdf',
                    'https://static-content.springer.com/esm/art%3A10.1038%2Fs41591-022-01689-3/MediaObjects/41591_2022_1689_MOESM1_ESM.pdf',
                    'https://assets.researchsquare.com/files/rs-1139035/v1_covered.pdf?c=1640020576'
                ]
            },
            sourceDiversity: {
                score: 80,
                label: '4 unique sources',
                data: [
                    'www.nature.com',
                    'www.medrxiv.org',
                    'static-content.springer.com',
                    'assets.researchsquare.com'
                ]
            }
        }
    };

    // This data can be embedded by some proxy server.
    // It is means that data already fetched on server-side and
    // client-side shoudln't make any additional API requests
    // to get report data.
    //
    // `window.vlrnkReportData` have exact structure as `data`.
    if (window.vlrnkReportData != null) {
        return window.vlrnkReportData;
    }

    if (isDevelopment()) {
        return data;
    }

    // We always expect that `window.vlrnkReportData` is already embedded.
    // In future, if you decide to support another scenario when client-side
    // can make requests to API, here you can make request to API.
    throw new Error('No report data');
}

/**
 * Converts score [0, 100] into short status.
 */
export function scoreToStatus(score) {
    if (score < 35) {
        return 'Bad';
    } else if (score < 65) {
        return 'Mediocre';
    } else if (score < 85) {
        return 'Good';
    } else {
        return 'Great';
    }
}

const COLOR = {
    red: '#EE5339',
    orange: '#F38E3A',
    yellow: '#F6D243',
    lightGreen: '#CDD649',
    green: '#5BAE50'
};

/**
 * Converts score [0, 100] into HEX color.
 */
export function scoreToColor(score) {
    if (score < 20) {
        return COLOR.red;
    } else if (score < 40) {
        return COLOR.orange;
    } else if (score < 60) {
        return COLOR.yellow;
    } else if (score < 80) {
        return COLOR.lightGreen;
    } else {
        return COLOR.green;
    }
}

/**
 * Converts score [0, 100] into long description.
 */
export function scoreToDescription(score) {
    if (score < 35) {
        return `"Bad" means our model analyzed this article and found that it\nis nearly devoid of any informative value. Scores in this range\nare typical in fake/satire news outlets, marketing or advertising\ncopy, pure propaganda, or conspiracy theorists' websites.\nOur model has no way to distinguish satire from intentionally\nmisleading materials, and therefore penalizes both to the same\ndegree (based on text alone).`;
    } else if (score < 65) {
        return `"Mediocre" means our model analyzed the article and found that it\nmixes some informative elements with A LOT of negative persuasion\ntechniques, aiming primarily to persuade (not inform) the reader.\nScores in this range are typical in partisan or agenda-driven websites,\nand are often seen in some of the subtler propaganda campaigns.`;
    } else if (score < 85) {
        return `"Good" means our model analyzed the article's text and found that it\nmixes informative elements with persuasive elements, aiming both to\ninform and to sway the reader's opinion in some direction. In other\nwords, this article was penalized for using some unnecessary flourishes\n(e.g. subjective language, biased presuppositions, hyperbolic choice of\nwords, etc) that a purely-informative article would generally avoid.\nScores in this range are typical for editorials or opinion articles.`;
    } else {
        return `"Great" means our model analyzed the article's text and found that it\nis a) informative, and b) does not contain any negative elements that\nattempt to persuade or trick the reader. Scores in this range are\ntypical for encyclopedia entries or strictly-factual news reports.`;
    }
}

/**
 * User descriptions of Valurank indicators which come from `getReportData()`.
 */
export const INDICATORS = {
    quality: {
        title: 'Informative language',
        description: `A supervised NLP model trained to rank articles along a continuum ranging from\npurely-informative (like encyclopedia entries) to pure-conjecture (like fake news or\nfan fiction). This score tends to have an inverse correlation with the level of\n"opinionatedness" the article's author exhibits in his/her writing, i.e. editorials and\nopinion pieces will generally score lower than factual news reports.`,
        maxScore: 100
    },
    biasedLanguage: {
        title: 'Subjective language',
        description: `A supervised NLP model trained on a dataset of wikipedia edits rejected for being subjective\nor exhibiting bias. The scale is inverted: a low score indicates subjectivity or bias, whereas a\nhigh score indicates a neutral tone.`,
        maxScore: 100
    },
    propagandaLikelihood: {
        title: 'Use of known propaganda techniques',
        description: `A supervised NLP model trained on the QCRI dataset of 17 known propaganda techniques\nthat are used by repressive governments and state news agencies.`,
        maxScore: 100,
        scoreToColor: (score) => {
            if (score > 40) {
                return undefined;
            } else {
                return COLOR.red;
            }
        }
    },
    affiliatedLinks: {
        title: 'Affiliate links',
        description: `The number of affiliate links on the page (i.e. links that will take the reader to the\nlanding page of an online store or commercial service, and from which the writer\nwill receive an affiliate fee or other commercial incentive). Any number other than 0\ngenerally indicates that the writer of the article has a financial interest and does not\nmerely seek to inform the reader.`,
        scoreToColor: (score) => {
            if (score === 0) {
                return COLOR.red;
            } else {
                return undefined;
            }
        }
    },
    hateSpeech: {
        title: 'Hate speech',
        description: `A supervised NLP model trained to detect prejudicial or insulting language against\na particular group, particularly on the basis of race, religion, or sexual orientation.`,
        maxScore: 100,
        scoreToColor: (score) => {
            if (score > 95) {
                return undefined;
            } else if (score > 85) {
                return COLOR.orange;
            } else {
                return COLOR.red;
            }
        }
    },
    offensiveLanguage: {
        title: 'Offensive language',
        description: `A supervised NLP model trained to detect offensive language\nin all its common varieties - insults, obscenities, threats, racism, etc.`,
        maxScore: 100,
        scoreToColor: (score) => {
            if (score > 88) {
                return undefined;
            } else if (score > 76) {
                return COLOR.orange;
            } else {
                return COLOR.red;
            }
        }
    },
    tone: {
        title: 'Article tone',
        description: `Calculated as the relative difference between the number of pronouns\n(I, she, you) and the number of proper nouns used in the text. A high\nvalue indicates an informal or opinionated tone.`,
        maxScore: 100
    },
    readability: {
        title: 'Language complexity',
        description: `A measurement of the complexity of the language used. This model roughly\ncorresponds to the "grade-level" ranking used by many creator tools, but has\nbeen calibrated to work better for the type of content generally found online.`,
        maxScore: 100
    },
    externalReferences: {
        title: 'External references',
        description: `The number of references to external sources of information. This number does not include\naffiliate links, ads, or links to URLs that are hosted on the same domain as the host article\n(self-referencing); only non-commercial references to OTHER sources count.`,
        scoreToColor: (score) => {
            if (score === 0) {
                return COLOR.red;
            } else {
                return undefined;
            }
        }
    },
    sourceDiversity: {
        title: 'Source diversity',
        description: `The number of UNIQUE sources used as references. Using a broad range of sources\nas references generally indicates that the article is well researched.`,
        scoreToColor: (score) => {
            if (score === 0) {
                return COLOR.red;
            } else {
                return undefined;
            }
        }
    }
};
