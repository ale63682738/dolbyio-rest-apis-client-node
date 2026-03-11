/**
 * The allowable parameters for requesting the creation of a media distribution.
 */
export interface CreateMediaDistributionRequest {
    /** User-friendly name for the media distribution. The '*' character is not allowed. */
    name: string;
    /**
     * Set this as the default media distribution that will be associated with
     * all future media assets created without an explicit MediaDistributionId set.
     */
    default?: boolean;
    /** Optional. Specify security settings for your media distribution. */
    security?: {
        /**
         * Security keys that can be used to sign a JWT to authenticate media asset views.
         * If no keys are provided the media distribution will be unsecured.
         * This means any associated assets can be viewed without a token, and if a token is
         * provided the signing key will not be validated.
         * If a key is specified the media distribution will be secured and a valid token
         * signed with one of the provided keys will be required to view associated media assets.
         */
        keys?: {
            /** Name for the security key. */
            name?: string | null;
            /** Optional, key for the security key. */
            key: string;
        }[];
    };
}

/**
 * The allowable sort options for listing media distributions.
 */
export type ListMediaDistributionsSortBy = 'createdAt';

/**
 * The allowable parameters for listing and filtering media distributions.
 */
export interface ListMediaDistributionsQueryParams {
    /** Defaults to "createdAt". */
    sort?: ListMediaDistributionsSortBy;
    /** Optional. Case insensitive. */
    name?: string | null;
    /** Optional, search for default media distribution. */
    default?: boolean;
    /**
     * Used for pagination.
     * Do not include on the first request.
     * For subsequent requests use the `pagination.cursor` field from the previous response.
     * You must use the same sort option when requesting each page
     */
    cursor?: string | null;
    /** Optional, integer, 1 to 100, defaults to 25. */
    limit?: number;
    /** Optional, defaults to `false`, sort descending boolean. */
    desc?: boolean;
}

/**
 * Response data for the list media distributions requests.
 */
export interface ListMediaDistributionsResponse {
    /** Defaults to "createdAt". */
    data: MediaDistribution[];
    /** Pagination object. */
    pagination?: {
        /** Has more pages. */
        hasMore: boolean;
        /** Cursor to go to the next page. */
        cursor: string;
    };
}

/**
 * Response data for the creation of a media distribution.
 */
export interface MediaDistribution extends CreateMediaDistributionRequest {
    /** Identifier of the media distribution */
    id: string;
    /** When was the media distribution created. */
    createdAt: string;
}

/**
 * The allowable parameters for requesting the update of a media distribution.
 */
export interface UpdateMediaDistributionRequest {
    /** Identifier of the media distribution. */
    id: string;
    /** User-friendly name for the media distribution. The '*' character is not allowed. */
    name: string;
    /**
     * Set this as the default media distribution that will be associated with
     * all future media assets created without an explicit MediaDistributionId set.
     */
    default?: boolean;
}

/**
 * Represents a security key.
 */
export interface SecurityKey {
    /** Identifier of the security key. */
    id: string;
    /** Name of the security key. */
    name?: string;
}

/**
 * Represents a security key.
 */
export interface CreaseSecurityKeyRequest {
    /** Identifier of the media distribution */
    mediaDistributionId: string;
    /** Key of the security key. */
    key: string;
    /** Name of the security key. */
    name?: string;
}
