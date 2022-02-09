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
                score: 76,
                label: 'good'
            },
            biasedLanguage: {
                score: 48,
                label: 'moderately biased'
            },
            propagandaLikelihood: {
                score: 67,
                label: 'moderate'
            },
            affiliatedLinks: {
                score: 100,
                label: 'detected',
                data: [
                    'https://www.amazon.com/dp/B0863FR3S9?tag=digitrend08sub4-20&linkCode=ogi&th=1&psc=1&_keeptag=1',
                    'https://s.click.aliexpress.com/e/_9vnl2Z?af=&amp;cn=5&amp;cv=2805&amp'
                ]
            },
            hateSpeech: {
                score: 98,
                label: 'not detected'
            },
            offensiveLanguage: {
                score: 86,
                label: 'not detected'
            },
            tone: {
                score: 55,
                label: 'informal'
            },
            readability: {
                score: 53
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
 * User descriptions of Valurank indicators which come from `getReportData()`.
 */
export const INDICATORS = {
    quality: {
        title: 'Dispassionate language',
        description: `A supervised NLP model trained to rank articles along a continuum ranging from\npurely-informative (like encyclopedia entries) to pure-conjecture (like fake news or\nfan fiction). This score tends to have an inverse correlation with the level of\n"opinionatedness" the article's author exhibits in his/her writing, i.e. editorials and\nopinion pieces will generally score lower than factual news reports.`,
        maxScore: 100
    },
    biasedLanguage: {
        title: 'Subjectivitiy',
        description: `A supervised NLP model trained on a dataset of wikipedia edits rejected for being subjective\nor exhibiting bias. The scale here is inverted, i.e. a higher score means LESS subjectivity/bias.`,
        maxScore: 100
    },
    propagandaLikelihood: {
        title: 'Use of propaganda techniques',
        description: `A supervised NLP model trained on the QCRI dataset of known 17 known propaganda techniques\nthat are used by repressive governments and state news agencies. The scale here is inverted,\ni.e. a higher score means LOWER likelihood that propaganda techniques were used by the author.`,
        maxScore: 100
    },
    affiliatedLinks: {
        title: 'Affiliate links',
        description: `The number of affiliate links on the page (i.e. links that will take the reader to the\nlanding page of an online store or commercial service, and from which the writer\nwill receive an affiliate fee or other commercial incentive). Any number other than 0\ngenerally indicates that the writer of the article has a financial interest and does not\nmerely seek to inform the reader.`
    },
    hateSpeech: {
        title: 'Hate speech',
        maxScore: 100
    },
    offensiveLanguage: {
        title: 'Offensive language',
        description: `A supervised NLP model trained to detect offensive language\nin all its common varieties - insults, threats, racism, etc.`,
        maxScore: 100
    },
    tone: {
        title: 'Tone',
        maxScore: 100
    },
    readability: {
        title: 'Language complexity',
        description: `A measurement of the complexity of the language used. This model roughly\ncorresponds to the "grade-level" ranking used by many creator tools, but has\nbeen calibrated to work better for the type of content generally found online.`,
        maxScore: 100
    },
};
