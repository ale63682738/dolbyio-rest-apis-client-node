import { sendGet } from './internal/httpHelpers';
import * as Urls from '../urls';
import { GetStreamDetailsOptions, ListAllStreamsSortOptions, ListStreamsResponse, ListStreamsSortOptions, StreamDetails } from './types/monitoring';

/**
 * ## List Streams
 *
 * List all streams created within last hour with specific sorting and pagination.
 * If the transcoderId is provided, all streams associated with the current or last active instance will be returned,
 * regardless of the stream creation time. If response array is empty, you have reached the end of the list ordering.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/monitoring-list-recent-streams/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an {@link ListStreamsResponse} object.
 */
export const listStreams = async (apiSecret: string, options: ListStreamsSortOptions): Promise<ListStreamsResponse> => {
    const params = {
        sortBy: options.sortBy ?? 'Live',
        page: (options.page ?? 1).toString(),
        itemsOnPage: (options.itemsOnPage ?? 10).toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    if (options.isActive) {
        params['isActive'] = options.isActive;
    }
    if (options.cluster) {
        params['cluster'] = options.cluster.join(',');
    }
    if (options.isSecure) {
        params['isSecure'] = options.isSecure;
    }
    if (options.isMultisource) {
        params['isMultisource'] = options.isMultisource;
    }
    if (options.hasRedundant) {
        params['hasRedundant'] = options.hasRedundant;
    }
    if (options.searchSubstring) {
        params['searchSubstring'] = options.searchSubstring;
    }
    if (options.isRecordingAllowed) {
        params['isRecordingAllowed'] = options.isRecordingAllowed;
    }
    if (options.isRestreaming) {
        params['isRestreaming'] = options.isRestreaming;
    }
    if (options.transcoderId) {
        params['transcoderId'] = options.transcoderId;
    }

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/monitoring/streams',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<ListStreamsResponse>(queryOptions);
};

/**
 * ## List all Streams
 *
 * List all streams created within last hour with specific sorting and pagination.
 * If the transcoderId is provided, all streams associated with the current or last active instance will be returned,
 * regardless of the stream creation time. If response array is empty, you have reached the end of the list ordering.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/monitoring-list-recent-streams/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link StreamDetails} object.
 */
export const listAllStreams = async (apiSecret: string, options: ListAllStreamsSortOptions): Promise<StreamDetails[]> => {
    const result: Array<StreamDetails> = [];

    let page = 1;

    do {
        const listOptions: ListStreamsSortOptions = {
            ...options,
            page: page,
            itemsOnPage: 25,
        };

        const response = await listStreams(apiSecret, listOptions);

        if (response.data.length === 0) {
            break;
        }

        result.push(...response.data);

        page++;
    } while (true);

    return result;
};

/**
 * ## Stream Details
 *
 * Get stream details by stream name.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/monitoring-get-stream/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link PublishToken} objects.
 */
export const streamDetails = async (apiSecret: string, options: GetStreamDetailsOptions): Promise<StreamDetails> => {
    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: `/api/monitoring/streams/${options.streamName}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<StreamDetails>(queryOptions);
};
