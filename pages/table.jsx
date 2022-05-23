import Head from "next/head";
import { useState, useEffect } from "react";
import { getReportData } from "../lib/valurank";
import { Report } from "./index";

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
                        `,
                    }}
                />
            </Head>

            <main>
                {reportData && <Report data={reportData} onlyTable={true} />}
            </main>
        </>
    );
}
