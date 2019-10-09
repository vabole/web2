import * as request from 'superagent';
import { Response, SuperAgentRequest, SuperAgentStatic } from 'superagent';

export type RequestHeaders = {
    [header: string]: string;
};
export type RequestHeadersHandler = (headers: RequestHeaders) => RequestHeaders;

export type ConfigureAgentHandler = (
    agent: SuperAgentStatic
) => SuperAgentStatic;

export type ConfigureRequestHandler = (
    agent: SuperAgentRequest
) => SuperAgentRequest;

export type CallbackHandler = (err: any, res?: request.Response) => void;

export type CategoryTreeElement = {
    categoryId: number;
    categoryName: string;
    color?: string;
    count?: number;
    imageUrl?: string;
    ordinal: number;
    sportId: number;
    sportName: string;
};

export type CompetitorElement = {
    id: number;
    name: string;
};

export type CouponForm = {
    playerId?: string;
    steps?: Array<CouponStepForm>;
};

export type CouponStepForm = {
    events?: Array<EventForm>;
    m?: number;
    n?: number;
    odds?: number;
    rate?: number;
    type?: 'ORDINAR' | 'EXPRESS' | 'SYSTEM';
};

export type EventForm = {
    active?: boolean;
    odds?: number;
    rate?: number;
    selectionId?: number;
};

export type FixtureElement = {
    categoryId: number;
    categoryName: string;
    color?: string;
    competitionName?: string;
    competitor1: CompetitorElement;
    competitor2: CompetitorElement;
    count?: number;
    fixtureId: number;
    imageUrl?: string;
    markets?: Array<MarketElement>;
    ordinal: number;
    roundName?: string;
    sportId: number;
    sportName: string;
    startTime: string;
    statistics?: MatchStatsDto;
    tournamentId: number;
    tournamentName: string;
};

export type MarketElement = {
    id: number;
    name: string;
    selections: Array<SelectionElement>;
    status:
        | 'ACTIVE'
        | 'SUSPENDED'
        | 'DEACTIVATED'
        | 'SETTLED'
        | 'CANCELLED'
        | 'HANDED_OVER';
};

export type MatchStatsDto = {
    matchState?: string;
    periodEndTime?: string;
    periodScores?: {
        [key: string]: Score;
    };
    redCards?: Score;
    score?: Score;
    winner?: string;
    ylwCards?: Score;
};

export type PlayerModel = {
    balance?: number;
    email?: string;
    id?: string;
    isNew?: boolean;
    maxRate?: number;
    phone?: string;
};

export type Score = {
    competitor1?: number;
    competitor2?: number;
};

export type SelectionElement = {
    id: number;
    locked?: boolean;
    name: string;
    odds: number;
    oddsDirection: 'INCREASED' | 'DECREASED' | 'NOT_CHANGED';
};

export type SportTreeElement = {
    color?: string;
    count?: number;
    imageUrl?: string;
    ordinal: number;
    sportId: number;
    sportName: string;
};

export type StepForm = {
    date?: string;
    fixture?: FixtureElement;
    id?: number;
    market?: string;
    odds?: number;
    rate?: number;
    selection?: string;
    status?:
        | 'WAITING'
        | 'REFUND'
        | 'CANCELED'
        | 'IN_PLAY'
        | 'CALCULATED'
        | 'NO_CALCULATED';
    steps?: Array<StepForm>;
    type?: 'ORDINAR' | 'EXPRESS' | 'SYSTEM';
    typeName?: string;
    win?: number;
    winning?: boolean;
};

export type TournamentTreeElement = {
    categoryId: number;
    categoryName: string;
    color?: string;
    count?: number;
    imageUrl?: string;
    ordinal: number;
    sportId: number;
    sportName: string;
    tournamentId: number;
    tournamentName: string;
};

export type Logger = {
    log: (line: string) => any;
};

export interface ResponseWithBody<S extends number, T> extends Response {
    status: S;
    body: T;
}

export type QueryParameters = {
    [param: string]: any;
};

export interface CommonRequestOptions {
    $queryParameters?: QueryParameters;
    $domain?: string;
    $path?: string | ((path: string) => string);
    $retries?: number; // number of retries; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#retrying-requests
    $timeout?: number; // request timeout in milliseconds; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#timeouts
    $deadline?: number; // request deadline in milliseconds; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#timeouts
}

/**
 * Api Documentation
 * @class Spirs
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class Spirs {
    private domain: string = 'http://10.5.0.178:5000/api';
    private errorHandlers: CallbackHandler[] = [];
    private requestHeadersHandler?: RequestHeadersHandler;
    private configureAgentHandler?: ConfigureAgentHandler;
    private configureRequestHandler?: ConfigureRequestHandler;

    constructor(domain?: string, private logger?: Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    setRequestHeadersHandler(handler: RequestHeadersHandler) {
        this.requestHeadersHandler = handler;
    }

    setConfigureAgentHandler(handler: ConfigureAgentHandler) {
        this.configureAgentHandler = handler;
    }

    setConfigureRequestHandler(handler: ConfigureRequestHandler) {
        this.configureRequestHandler = handler;
    }

    private request(
        method: string,
        url: string,
        body: any,
        headers: RequestHeaders,
        queryParameters: QueryParameters,
        form: any,
        reject: CallbackHandler,
        resolve: CallbackHandler,
        opts: CommonRequestOptions
    ) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        const agent = this.configureAgentHandler
            ? this.configureAgentHandler(request.default)
            : request.default;

        let req = agent(method, url);
        if (this.configureRequestHandler) {
            req = this.configureRequestHandler(req);
        }

        req = req.query(queryParameters);

        if (body) {
            req.send(body);

            if (
                typeof body === 'object' &&
                !(body.constructor.name === 'Buffer')
            ) {
                headers['Content-Type'] = 'application/json';
            }
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        if (this.requestHeadersHandler) {
            headers = this.requestHeadersHandler({
                ...headers
            });
        }

        req.set(headers);

        if (opts.$retries && opts.$retries > 0) {
            req.retry(opts.$retries);
        }

        if (
            (opts.$timeout && opts.$timeout > 0) ||
            (opts.$deadline && opts.$deadline > 0)
        ) {
            req.timeout({
                deadline: opts.$deadline,
                response: opts.$timeout
            });
        }

        req.end((error, response) => {
            // an error will also be emitted for a 4xx and 5xx status code
            // the error object will then have error.status and error.response fields
            // see superagent error handling: https://github.com/visionmedia/superagent/blob/master/docs/index.md#error-handling
            if (error) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    getCategoryListUsingGETURL(
        parameters: {
            mode: 'LINE' | 'LIVE' | 'FINISHED';
            sportId: number;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/categories';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['mode'] !== undefined) {
            queryParameters['mode'] = parameters['mode'];
        }

        if (parameters['sportId'] !== undefined) {
            queryParameters['sportId'] = parameters['sportId'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Получение дерева категорий спортивных мероприятий для указанного вида спорта
     * @method
     * @name Test#getCategoryListUsingGET
     * @param {string} mode - Статус спортивного события
     * @param {integer} sportId - Идентификатор вида спорта
     */
    getCategoryListUsingGET(
        parameters: {
            mode: 'LINE' | 'LIVE' | 'FINISHED';
            sportId: number;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, Array<CategoryTreeElement>>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/categories';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['mode'] !== undefined) {
                queryParameters['mode'] = parameters['mode'];
            }

            if (parameters['mode'] === undefined) {
                reject(new Error('Missing required  parameter: mode'));
                return;
            }

            if (parameters['sportId'] !== undefined) {
                queryParameters['sportId'] = parameters['sportId'];
            }

            if (parameters['sportId'] === undefined) {
                reject(new Error('Missing required  parameter: sportId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request(
                'GET',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    getFavoritesUsingGETURL(
        parameters: {
            playerId: string;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/favorites';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['playerId'] !== undefined) {
            queryParameters['playerId'] = parameters['playerId'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Получение списка мероприятий, добавленных в избранное
     * @method
     * @name Test#getFavoritesUsingGET
     * @param {string} playerId - Идентификатор пользователя
     */
    getFavoritesUsingGET(
        parameters: {
            playerId: string;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, Array<FixtureElement>>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/favorites';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['playerId'] !== undefined) {
                queryParameters['playerId'] = parameters['playerId'];
            }

            if (parameters['playerId'] === undefined) {
                reject(new Error('Missing required  parameter: playerId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request(
                'GET',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    addUsingPOSTURL(
        parameters: {
            fixtureId: number;
            playerId: string;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/favorites/add';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['fixtureId'] !== undefined) {
            queryParameters['fixtureId'] = parameters['fixtureId'];
        }

        if (parameters['playerId'] !== undefined) {
            queryParameters['playerId'] = parameters['playerId'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Добавить мероприятие в избранное
     * @method
     * @name Test#addUsingPOST
     * @param {integer} fixtureId - Идентификатор мероприятия
     * @param {string} playerId - Идентификатор пользователя
     */
    addUsingPOST(
        parameters: {
            fixtureId: number;
            playerId: string;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, void>
        | ResponseWithBody<201, void>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/favorites/add';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';

            if (parameters['fixtureId'] !== undefined) {
                queryParameters['fixtureId'] = parameters['fixtureId'];
            }

            if (parameters['fixtureId'] === undefined) {
                reject(new Error('Missing required  parameter: fixtureId'));
                return;
            }

            if (parameters['playerId'] !== undefined) {
                queryParameters['playerId'] = parameters['playerId'];
            }

            if (parameters['playerId'] === undefined) {
                reject(new Error('Missing required  parameter: playerId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request(
                'POST',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    deleteUsingPOSTURL(
        parameters: {
            fixtureId: number;
            playerId: string;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/favorites/delete';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['fixtureId'] !== undefined) {
            queryParameters['fixtureId'] = parameters['fixtureId'];
        }

        if (parameters['playerId'] !== undefined) {
            queryParameters['playerId'] = parameters['playerId'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Удалить мероприятие из избранного
     * @method
     * @name Test#deleteUsingPOST
     * @param {integer} fixtureId - Идентификатор мероприятия
     * @param {string} playerId - Идентификатор пользователя
     */
    deleteUsingPOST(
        parameters: {
            fixtureId: number;
            playerId: string;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, void>
        | ResponseWithBody<201, void>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/favorites/delete';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';

            if (parameters['fixtureId'] !== undefined) {
                queryParameters['fixtureId'] = parameters['fixtureId'];
            }

            if (parameters['fixtureId'] === undefined) {
                reject(new Error('Missing required  parameter: fixtureId'));
                return;
            }

            if (parameters['playerId'] !== undefined) {
                queryParameters['playerId'] = parameters['playerId'];
            }

            if (parameters['playerId'] === undefined) {
                reject(new Error('Missing required  parameter: playerId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request(
                'POST',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    getFixtureUsingGETURL(
        parameters: {
            id: number;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/fixture';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['id'] !== undefined) {
            queryParameters['id'] = parameters['id'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Получение списка спортивных мероприятий для указанного турнира
     * @method
     * @name Test#getFixtureUsingGET
     * @param {integer} id - Статус спортивного события
     */
    getFixtureUsingGET(
        parameters: {
            id: number;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, FixtureElement>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/fixture';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['id'] !== undefined) {
                queryParameters['id'] = parameters['id'];
            }

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request(
                'GET',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    //     type getFixturesUsingGetURLParameters =  {
    //     categoryId?: number;
    //     sportId?: number;
    //     status:
    //         | 'NOT_STARTED'
    //         | 'LIVE'
    //         | 'SUSPENDED'
    //         | 'ENDED'
    //         | 'FINISHED'
    //         | 'CANCELLED'
    //         | 'ABANDONED'
    //         | 'DELAYED'
    //         | 'UNKNOWN';
    //     top?: boolean;
    //     tournamentId?: number;
    // }

    getFixturesUsingGETURL(
        parameters: {
            categoryId?: number;
            sportId?: number;
            status:
                | 'NOT_STARTED'
                | 'LIVE'
                | 'SUSPENDED'
                | 'ENDED'
                | 'FINISHED'
                | 'CANCELLED'
                | 'ABANDONED'
                | 'DELAYED'
                | 'UNKNOWN';
            top?: boolean;
            tournamentId?: number;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/fixtures';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['categoryId'] !== undefined) {
            queryParameters['categoryId'] = parameters['categoryId'];
        }

        if (parameters['sportId'] !== undefined) {
            queryParameters['sportId'] = parameters['sportId'];
        }

        if (parameters['status'] !== undefined) {
            queryParameters['status'] = parameters['status'];
        }

        if (parameters['top'] !== undefined) {
            queryParameters['top'] = parameters['top'];
        }

        if (parameters['tournamentId'] !== undefined) {
            queryParameters['tournamentId'] = parameters['tournamentId'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Получение списка спортивных мероприятий для указанного турнира
     * @method
     * @name Test#getFixturesUsingGET
     * @param {integer} categoryId - Идентификатор категории
     * @param {integer} sportId - Идентификатор вида спорта
     * @param {string} status - Статус спортивного мероприятия
     * @param {boolean} top - Признак рейтингового спортивного мероприятия
     * @param {integer} tournamentId - Идентификатор турнира
     */
    getFixturesUsingGET(
        parameters: {
            categoryId?: number;
            sportId?: number;
            status:
                | 'NOT_STARTED'
                | 'LIVE'
                | 'SUSPENDED'
                | 'ENDED'
                | 'FINISHED'
                | 'CANCELLED'
                | 'ABANDONED'
                | 'DELAYED'
                | 'UNKNOWN';
            top?: boolean;
            tournamentId?: number;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, Array<FixtureElement>>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/fixtures';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['categoryId'] !== undefined) {
                queryParameters['categoryId'] = parameters['categoryId'];
            }

            if (parameters['sportId'] !== undefined) {
                queryParameters['sportId'] = parameters['sportId'];
            }

            if (parameters['status'] !== undefined) {
                queryParameters['status'] = parameters['status'];
            }

            if (parameters['status'] === undefined) {
                reject(new Error('Missing required  parameter: status'));
                return;
            }

            if (parameters['top'] !== undefined) {
                queryParameters['top'] = parameters['top'];
            }

            if (parameters['tournamentId'] !== undefined) {
                queryParameters['tournamentId'] = parameters['tournamentId'];
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request(
                'GET',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    getPlayerInfoUsingGETURL(
        parameters: {
            playerId: string;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/playerInfo';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['playerId'] !== undefined) {
            queryParameters['playerId'] = parameters['playerId'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Получение информации по пользователю(баланс и тд)
     * @method
     * @name Test#getPlayerInfoUsingGET
     * @param {string} playerId - Идентификатор пользователя
     */
    getPlayerInfoUsingGET(
        parameters: {
            playerId: string;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, PlayerModel>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/playerInfo';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['playerId'] !== undefined) {
                queryParameters['playerId'] = parameters['playerId'];
            }

            if (parameters['playerId'] === undefined) {
                reject(new Error('Missing required  parameter: playerId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request(
                'GET',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    getSportListUsingGETURL(
        parameters: {
            mode: 'LINE' | 'LIVE' | 'FINISHED';
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/sports';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['mode'] !== undefined) {
            queryParameters['mode'] = parameters['mode'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Получение дерева видов спорта спортивных мероприятий
     * @method
     * @name Test#getSportListUsingGET
     * @param {string} mode - Статус спортивного события
     */
    getSportListUsingGET(
        parameters: {
            mode: 'LINE' | 'LIVE' | 'FINISHED';
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, Array<SportTreeElement>>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/sports';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['mode'] !== undefined) {
                queryParameters['mode'] = parameters['mode'];
            }

            if (parameters['mode'] === undefined) {
                reject(new Error('Missing required  parameter: mode'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request(
                'GET',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    getStepsUsingGETURL(
        parameters: {
            playerId: string;
            status?:
                | 'WAITING'
                | 'REFUND'
                | 'CANCELED'
                | 'IN_PLAY'
                | 'CALCULATED'
                | 'NO_CALCULATED';
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/steps';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['playerId'] !== undefined) {
            queryParameters['playerId'] = parameters['playerId'];
        }

        if (parameters['status'] !== undefined) {
            queryParameters['status'] = parameters['status'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Информация по совершенным шагам
     * @method
     * @name Test#getStepsUsingGET
     * @param {string} playerId - Идентификатор пользователя
     * @param {string} status - Статус шага(если не указывать - пришлет все)
     */
    getStepsUsingGET(
        parameters: {
            playerId: string;
            status?:
                | 'WAITING'
                | 'REFUND'
                | 'CANCELED'
                | 'IN_PLAY'
                | 'CALCULATED'
                | 'NO_CALCULATED';
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, Array<StepForm>>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/steps';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['playerId'] !== undefined) {
                queryParameters['playerId'] = parameters['playerId'];
            }

            if (parameters['playerId'] === undefined) {
                reject(new Error('Missing required  parameter: playerId'));
                return;
            }

            if (parameters['status'] !== undefined) {
                queryParameters['status'] = parameters['status'];
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request(
                'GET',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    saveCouponUsingPOSTURL(
        parameters: {
            couponForm: CouponForm;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/steps/save-coupon';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Сохранение купона
     * @method
     * @name Test#saveCouponUsingPOST
     * @param {} couponForm - couponForm
     */
    saveCouponUsingPOST(
        parameters: {
            couponForm: CouponForm;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, void>
        | ResponseWithBody<201, void>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/steps/save-coupon';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';

            if (parameters['couponForm'] !== undefined) {
                body = parameters['couponForm'];
            }

            if (parameters['couponForm'] === undefined) {
                reject(new Error('Missing required  parameter: couponForm'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request(
                'POST',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    updateCouponUsingPOSTURL(
        parameters: {
            couponForm: CouponForm;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/steps/update-coupon';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Получение обновленных коэффициентов и статусов по маркетам, который еще не сохранен клиентом
     * @method
     * @name Test#updateCouponUsingPOST
     * @param {} couponForm - couponForm
     */
    updateCouponUsingPOST(
        parameters: {
            couponForm: CouponForm;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, CouponForm>
        | ResponseWithBody<201, void>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/steps/update-coupon';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';

            if (parameters['couponForm'] !== undefined) {
                body = parameters['couponForm'];
            }

            if (parameters['couponForm'] === undefined) {
                reject(new Error('Missing required  parameter: couponForm'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request(
                'POST',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }

    getTournamentListUsingGETURL(
        parameters: {
            categoryId: number;
            mode: 'LINE' | 'LIVE' | 'FINISHED';
            sportId: number;
        } & CommonRequestOptions
    ): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/tournaments';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        if (parameters['categoryId'] !== undefined) {
            queryParameters['categoryId'] = parameters['categoryId'];
        }

        if (parameters['mode'] !== undefined) {
            queryParameters['mode'] = parameters['mode'];
        }

        if (parameters['sportId'] !== undefined) {
            queryParameters['sportId'] = parameters['sportId'];
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return (
            domain +
            path +
            (keys.length > 0
                ? '?' +
                  keys
                      .map(
                          key =>
                              key +
                              '=' +
                              encodeURIComponent(queryParameters[key])
                      )
                      .join('&')
                : '')
        );
    }

    /**
     * Получение дерева турниров спортивных мероприятий для указанных вида спорта и категории
     * @method
     * @name Test#getTournamentListUsingGET
     * @param {integer} categoryId - Идентификатор категории
     * @param {string} mode - Статус спортивного события
     * @param {integer} sportId - Идентификатор вида спорта
     */
    getTournamentListUsingGET(
        parameters: {
            categoryId: number;
            mode: 'LINE' | 'LIVE' | 'FINISHED';
            sportId: number;
        } & CommonRequestOptions
    ): Promise<
        | ResponseWithBody<200, Array<TournamentTreeElement>>
        | ResponseWithBody<401, void>
        | ResponseWithBody<403, void>
        | ResponseWithBody<404, void>
    > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/v1/tournaments';
        if (parameters.$path) {
            path =
                typeof parameters.$path === 'function'
                    ? parameters.$path(path)
                    : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['categoryId'] !== undefined) {
                queryParameters['categoryId'] = parameters['categoryId'];
            }

            if (parameters['categoryId'] === undefined) {
                reject(new Error('Missing required  parameter: categoryId'));
                return;
            }

            if (parameters['mode'] !== undefined) {
                queryParameters['mode'] = parameters['mode'];
            }

            if (parameters['mode'] === undefined) {
                reject(new Error('Missing required  parameter: mode'));
                return;
            }

            if (parameters['sportId'] !== undefined) {
                queryParameters['sportId'] = parameters['sportId'];
            }

            if (parameters['sportId'] === undefined) {
                reject(new Error('Missing required  parameter: sportId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request(
                'GET',
                domain + path,
                body,
                headers,
                queryParameters,
                form,
                reject,
                resolve,
                parameters
            );
        });
    }
}
