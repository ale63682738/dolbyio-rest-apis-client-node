import { ListSortOptions } from './core';

export interface ListStreamsResponse {
    /** Pagination object. */
    pagination?: {
        /** Total number of items. */
        totalItems: number;
        /** Total number of pages. */
        totalPages: number;
        /** Number of items in that page. */
        itemsOnPage: number;
    };

    /** Array of stream details. */
    data: StreamDetails[];
}

/** Represents a stream details. */
export interface StreamDetails {
    /** Identifier of the stream. */
    streamId: string;
    /** Name of the stream. */
    streamName: string;
    /** Identifier of the cluster. */
    clusterId: string;
    /** List of clusters. */
    clusters: string[];
    /** Secure stream. */
    secureStream: boolean;
    /** Is recording allowed for this stream. */
    isRecordingAllowed: boolean;
    /** Is multisource enabled. */
    multisource: boolean;
    /** Is the stream live. */
    live: boolean;
    /** Stream publishing start time. */
    startTime: string;
    /** Stream publishing end time. */
    endTime: string;
    /** Viewer count. */
    viewerCount: number;
    /** Has redundant stream. */
    hasRedundant: boolean;
    /** Restreaming enabled. */
    restreaming: boolean;
    /** Feeds. */
    feeds: {
        /** Identifier of the stream. */
        streamId: string;
        /** Identifier of the feed. */
        feedId: string;
        /** Identifier of the cluster. */
        clusterId: string;
        /** Identifier of the source. */
        sourceId: string;
        /** Simulcast ID. */
        simulcastId: string;
        /** Server ID. */
        serverId: string;
        /** Is the feed active. */
        active: boolean;
        /** Stream publishing start time. */
        startTime: string;
        /** Stream publishing end time. */
        endTime?: string;
        /** Is recording allowed for this stream. */
        isRecordingAllowed: boolean;
        /** Packet loss percentage over last five minutes. */
        packetLoss: number;
        /** Is the feed redundant. */
        isRedundant?: boolean;
        /** Feed priority. */
        priority?: number;
        /** Framerate. */
        frameRate: number;
        /** Feed type. */
        type: string;
        /** Identifier of the token. */
        tokenId: number;

        /** Client. */
        client: {
            /** Country. */
            country: string;
            /** City. */
            city: string;
            /** Continent. */
            continent: string;
            /** coordinates. */
            coordinates: number[];
            /** Sub. */
            sub: string[];
            /** IP Address. */
            ip: string;
        };

        /** Restream information. */
        restreams: Restream[];

        /** Feed statistics. */
        feedStats: FeedStats[];

        /** Details for all tracks. */
        trackDetails: {
            /** Idenitfier of the track. */
            trackId: string;
            /** Encoding details. */
            encodingDetails: {
                /** Encoding ID. */
                encodingId: string;
                /** I-frame rate. */
                iFrameRate: number;
                /** B-frame rate. */
                bFrameRate: number;
                /** P-frame rate. */
                pFrameRate: number;
                /** Encoding statistics. */
                encodingStats: {
                    /** Timestamp of the entry. */
                    timestamp: string;
                    /** Timestamp of the entry. */
                    resolution: {
                        /** Height of the frame. */
                        height: number;
                        /** Width of the frame. */
                        width: number;
                    };
                    /** Bitrate. */
                    bitRate: {
                        /** Audio bitrate. */
                        audioBitrate: number;
                        /** Video bitrate. */
                        videoBitrate: number;
                    };
                    /** Video codec. */
                    videoCodec: number;
                    /** Audio codec. */
                    audioCodec: number;
                    /** Frames. */
                    frames?: number;
                    /** RTT. */
                    rtt?: number;
                    /** Buffer Time. */
                    bufferTime?: number;
                    /** B-frames. */
                    bFrames?: number;
                }[];
            }[];
        }[];
    }[];
}

/** Represents the restream information. */
export interface Restream {
    /** Name of the restream. */
    label: string;
    /** Index of the restream. */
    index: number;
    /** URL of the restream. */
    url: string;
    /** Is the restream active. */
    active: boolean;
    /** List of events. */
    events: {
        /** Start time of the event. */
        started: string;
        /** End time of the event. */
        ended?: string;
        /** Error message. */
        error: string;
    }[];
}

/** Represents the feed statistics. */
export interface FeedStats {
    /** Timestamp of the feed stats. */
    timestamp: string;
    /** Packet loss percentage over last five seconds. */
    packetLoss: number;
}

/** Represents the options to sort the response for listing all the streams. */
export interface ListAllStreamsSortOptions {
    /** How to sort the response. */
    sortBy: 'Live';
    /** Active streams. */
    isActive?: boolean;
    /** Filter the list of clusters. */
    cluster?: string[];
    /** Secure streams. */
    isSecure?: boolean;
    /** Multi source streams. */
    isMultisource?: boolean;
    /** Redundant streams. */
    hasRedundant?: boolean;
    /** Filter the stream names. */
    searchSubstring?: string;
    /** Recorded allowed. */
    isRecordingAllowed?: boolean;
    /** Restreaming streams. */
    isRestreaming?: boolean;
    /** Identifier of the transcoder. */
    transcoderId?: string;
}

/** Represents the options to sort the response for listing streams. */
export interface ListStreamsSortOptions extends ListAllStreamsSortOptions, ListSortOptions<'Live'> {}

/** Represents the options to query the stream details. */
export interface GetStreamDetailsOptions {
    /** Name of the stream to query. */
    streamName: string;
}
