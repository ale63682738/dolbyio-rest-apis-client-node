import * as Urls from '../urls';
import {
    CreateMediaDistributionRequest,
    UpdateMediaDistributionRequest,
    MediaDistribution,
    ListMediaDistributionsQueryParams,
    ListMediaDistributionsResponse,
    SecurityKey,
    CreaseSecurityKeyRequest,
} from './types/mediaDistributions';
import { sendDelete, sendGet, sendPatch, sendPost } from './internal/httpHelpers';
import { toDictString } from './internal/stringHelpers';

/**
 * ## Creates Media Distribution
 *
 * Creates a new media distribution for viewing HLS media assets.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-distributions-create-media-distribution/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param createRequest The request body for creating a new media asset.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an {@link MediaDistribution} object.
 */
export const create = async (apiSecret: string, createRequest: CreateMediaDistributionRequest) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/media/distributions',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(createRequest),
    };

    return await sendPost<MediaDistribution>(options);
};

/**
 * ## Lists Media Distribution
 *
 * List all media distributions with specific sorting and pagination.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-distributions-list-media-distribution/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param params Query parameters for filtering the list of media distributions.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link ListMediaDistributionsResponse} objects.
 */
export const list = async (apiSecret: string, params: ListMediaDistributionsQueryParams) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/media/distributions',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        params: toDictString(params),
    };

    return await sendGet<ListMediaDistributionsResponse[]>(options);
};

/**
 * ## Reads Media Distribution
 *
 * Gets media distribution specified by `mediaDistributionId`.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-distributions-read-media-distribution/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param mediaDistributionId The ID of the media distribution to read.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an {@link MediaDistribution} object.
 */
export const read = async (apiSecret: string, mediaDistributionId: string) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/distributions/${mediaDistributionId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<MediaDistribution>(options);
};

/**
 * ## Deletes Media Distribution
 *
 * Deletes media distribution specified by a `mediaDistributionId`.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-distributions-delete-media-distribution/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param mediaDistributionId The ID of the media distribution to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of asset deletion tasks that failed.
 */
export const deleteMediaDistribution = async (apiSecret: string, mediaDistributionId: string) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/distributions/${mediaDistributionId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendDelete<{ id?: string; error?: string }[] | null>(options);
};

/**
 * ## Updates Media Asset
 *
 * Update media asset settings.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-distributions-update-media-distribution/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param updateRequest The request body for creating a new media asset.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link MediaDistribution} object.
 */
export const updateMediaDistribution = async (apiSecret: string, updateRequest: UpdateMediaDistributionRequest) => {
    const body = {
        name: updateRequest.name,
        default: updateRequest.default,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/distributions/${updateRequest.id}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPatch<MediaDistribution>(options);
};

/**
 * ## Gets all security keys of a media distribution by ID
 *
 * Get all security keys of a media distribution by ID.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-distributions-get-security-keys/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param mediaDistributionId The ID of the media distribution to get the security keys from.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link SecurityKey} object.
 */
export const getSecurityKey = async (apiSecret: string, mediaDistributionId: string) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/distributions/${mediaDistributionId}/security/keys`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<SecurityKey[]>(options);
};

/**
 * ## Creates a Security Key
 *
 * Creates a new security key for a media distribution. Each media distribution may have up to 2 security keys.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-distributions-create-security-key/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param createRequest The request body for creating a new security key.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link SecurityKey} object.
 */
export const createSecurityKey = async (apiSecret: string, createRequest: CreaseSecurityKeyRequest) => {
    const body = {
        name: createRequest.name,
        key: createRequest.key,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/distributions/${createRequest.mediaDistributionId}/security/keys`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPost<SecurityKey>(options);
};

/**
 * ## Deletes Media Distribution Security Key
 *
 * Deletes a media distribution security key.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-distributions-delete-security-key/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param mediaDistributionId The ID of the media distribution to get the key from.
 * @param securityKeyId The ID of the security key to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of asset deletion tasks that failed.
 */
export const deleteSecurityKey = async (apiSecret: string, mediaDistributionId: string, securityKeyId: string) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/distributions/${mediaDistributionId}/security/keys/${securityKeyId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendDelete<{ status?: string; message?: string }[] | null>(options);
};
