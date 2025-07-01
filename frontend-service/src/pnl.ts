import {PnL} from "./types";
import {cachePnLs, getPnLsRecords, restoreCachedPnLs} from "./db";
import {transformPnlRecordToPnl} from "./transformation";
import {MAX_PNL_RECORDS_TO_RETURN} from "./config";

export async function getPnls(): Promise<PnL[]> {

    // YOUR CODE HERE
    try {

        const cachedPnLs = await restoreCachedPnLs();

        if (cachedPnLs !== null && cachedPnLs.length > 0) {
            console.log("Returning cached PnLs");
            return cachedPnLs;
        }

        const pnls = await getPnLsData({count: MAX_PNL_RECORDS_TO_RETURN});

        if (pnls.length > 0) {
            cachePnLs(pnls); // Fire and forget, don't await the response
        }
        return pnls;

    } catch (e) {
        console.log("Error fetching PnLs:", e);
        return []
    }
}

const getPnLsData = async ({count = 10}: { count?: number }) => {
    const pnls = await getPnLsRecords({count});
    return pnls.map(pnl => transformPnlRecordToPnl(pnl))
}