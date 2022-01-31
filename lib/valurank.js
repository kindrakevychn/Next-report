import {
    isDevelopment
} from './env';

export async function getReportData() {
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
