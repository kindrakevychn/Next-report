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
