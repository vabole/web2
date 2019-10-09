export const model = {
    swagger: '2.0',
    info: {
        description: 'Api Documentation',
        version: '1.0',
        title: 'Api Documentation',
        termsOfService: 'urn:tos',
        contact: {},
        license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0'
        }
    },
    host: '10.5.0.178:9999',
    basePath: '/api',
    tags: [
        { name: 'favorites-controller', description: 'Избранное' },
        { name: 'line-controller', description: 'Линия' },
        { name: 'player-controller', description: 'Информация о клиенте' },
        {
            name: 'step-controller',
            description: 'Совершение шагов / история шагов'
        }
    ],
    paths: {
        '/v1/categories': {
            get: {
                tags: ['line-controller'],
                summary:
                    'Получение дерева категорий спортивных мероприятий для указанного вида спорта',
                operationId: 'getCategoryListUsingGET',
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'mode',
                        in: 'query',
                        description: 'Статус спортивного события',
                        required: true,
                        type: 'string',
                        allowEmptyValue: false,
                        enum: ['LINE', 'LIVE', 'FINISHED']
                    },
                    {
                        name: 'sportId',
                        in: 'query',
                        description: 'Идентификатор вида спорта',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                        allowEmptyValue: false,
                        'x-example': 1
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: {
                            type: 'array',
                            items: { $ref: '#/definitions/CategoryTreeElement' }
                        }
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/favorites': {
            get: {
                tags: ['favorites-controller'],
                summary:
                    'Получение списка мероприятий, добавленных в избранное',
                operationId: 'getFavoritesUsingGET',
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'playerId',
                        in: 'query',
                        description: 'Идентификатор пользователя',
                        required: true,
                        type: 'string',
                        default: '9c82a018-8c42-11e9-bc42-526af7764f64',
                        format: 'uuid',
                        allowEmptyValue: false
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: {
                            type: 'array',
                            items: { $ref: '#/definitions/FixtureElement' }
                        }
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/favorites/add': {
            post: {
                tags: ['favorites-controller'],
                summary: 'Добавить мероприятие в избранное',
                operationId: 'addUsingPOST',
                consumes: ['application/json'],
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'fixtureId',
                        in: 'query',
                        description: 'Идентификатор мероприятия',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                        allowEmptyValue: false,
                        'x-example': 1
                    },
                    {
                        name: 'playerId',
                        in: 'query',
                        description: 'Идентификатор пользователя',
                        required: true,
                        type: 'string',
                        default: '9c82a018-8c42-11e9-bc42-526af7764f64',
                        format: 'uuid',
                        allowEmptyValue: false
                    }
                ],
                responses: {
                    '200': { description: 'OK' },
                    '201': { description: 'Created' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/favorites/delete': {
            post: {
                tags: ['favorites-controller'],
                summary: 'Удалить мероприятие из избранного',
                operationId: 'deleteUsingPOST',
                consumes: ['application/json'],
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'fixtureId',
                        in: 'query',
                        description: 'Идентификатор мероприятия',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                        allowEmptyValue: false,
                        'x-example': 1
                    },
                    {
                        name: 'playerId',
                        in: 'query',
                        description: 'Идентификатор пользователя',
                        required: true,
                        type: 'string',
                        default: '9c82a018-8c42-11e9-bc42-526af7764f64',
                        format: 'uuid',
                        allowEmptyValue: false
                    }
                ],
                responses: {
                    '200': { description: 'OK' },
                    '201': { description: 'Created' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/fixture': {
            get: {
                tags: ['line-controller'],
                summary:
                    'Получение списка спортивных мероприятий для указанного турнира',
                operationId: 'getFixtureUsingGET',
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'id',
                        in: 'query',
                        description: 'Статус спортивного события',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                        allowEmptyValue: false
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: { $ref: '#/definitions/FixtureElement' }
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/fixtures': {
            get: {
                tags: ['line-controller'],
                summary:
                    'Получение списка спортивных мероприятий для указанного турнира',
                operationId: 'getFixturesUsingGET',
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'categoryId',
                        in: 'query',
                        description: 'Идентификатор категории',
                        required: false,
                        type: 'integer',
                        format: 'int64',
                        'x-example': 1
                    },
                    {
                        name: 'sportId',
                        in: 'query',
                        description: 'Идентификатор вида спорта',
                        required: false,
                        type: 'integer',
                        format: 'int64',
                        'x-example': 1
                    },
                    {
                        name: 'status',
                        in: 'query',
                        description: 'Статус спортивного мероприятия',
                        required: true,
                        type: 'string',
                        enum: [
                            'NOT_STARTED',
                            'LIVE',
                            'SUSPENDED',
                            'ENDED',
                            'FINISHED',
                            'CANCELLED',
                            'ABANDONED',
                            'DELAYED',
                            'UNKNOWN'
                        ]
                    },
                    {
                        name: 'top',
                        in: 'query',
                        description:
                            'Признак рейтингового спортивного мероприятия',
                        required: false,
                        type: 'boolean'
                    },
                    {
                        name: 'tournamentId',
                        in: 'query',
                        description: 'Идентификатор турнира',
                        required: false,
                        type: 'integer',
                        format: 'int64',
                        'x-example': 1
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: {
                            type: 'array',
                            items: { $ref: '#/definitions/FixtureElement' }
                        }
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/playerInfo': {
            get: {
                tags: ['player-controller'],
                summary: 'Получение информации по пользователю(баланс и тд)',
                operationId: 'getPlayerInfoUsingGET',
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'playerId',
                        in: 'query',
                        description: 'Идентификатор пользователя',
                        required: true,
                        type: 'string',
                        default: '9c82a018-8c42-11e9-bc42-526af7764f64',
                        format: 'uuid',
                        allowEmptyValue: false
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: { $ref: '#/definitions/PlayerModel' }
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/sports': {
            get: {
                tags: ['line-controller'],
                summary: 'Получение дерева видов спорта спортивных мероприятий',
                operationId: 'getSportListUsingGET',
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'mode',
                        in: 'query',
                        description: 'Статус спортивного события',
                        required: true,
                        type: 'string',
                        allowEmptyValue: false,
                        enum: ['LINE', 'LIVE', 'FINISHED']
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: {
                            type: 'array',
                            items: { $ref: '#/definitions/SportTreeElement' }
                        }
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/steps': {
            get: {
                tags: ['step-controller'],
                summary: 'Информация по совершенным шагам',
                operationId: 'getStepsUsingGET',
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'playerId',
                        in: 'query',
                        description: 'Идентификатор пользователя',
                        required: true,
                        type: 'string',
                        default: '9c82a018-8c42-11e9-bc42-526af7764f64',
                        format: 'uuid',
                        allowEmptyValue: false
                    },
                    {
                        name: 'status',
                        in: 'query',
                        description:
                            'Статус шага(если не указывать - пришлет все)',
                        required: false,
                        type: 'string',
                        allowEmptyValue: false,
                        enum: [
                            'WAITING',
                            'REFUND',
                            'CANCELED',
                            'IN_PLAY',
                            'CALCULATED',
                            'NO_CALCULATED'
                        ]
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: {
                            type: 'array',
                            items: { $ref: '#/definitions/StepForm' }
                        }
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/steps/save-coupon': {
            post: {
                tags: ['step-controller'],
                summary: 'Сохранение купона',
                operationId: 'saveCouponUsingPOST',
                consumes: ['application/json'],
                produces: ['*/*'],
                parameters: [
                    {
                        in: 'body',
                        name: 'couponForm',
                        description: 'couponForm',
                        required: true,
                        schema: { $ref: '#/definitions/CouponForm' }
                    }
                ],
                responses: {
                    '200': { description: 'OK' },
                    '201': { description: 'Created' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/steps/update-coupon': {
            post: {
                tags: ['step-controller'],
                summary:
                    'Получение обновленных коэффициентов и статусов по маркетам, который еще не сохранен клиентом',
                operationId: 'updateCouponUsingPOST',
                consumes: ['application/json'],
                produces: ['*/*'],
                parameters: [
                    {
                        in: 'body',
                        name: 'couponForm',
                        description: 'couponForm',
                        required: true,
                        schema: { $ref: '#/definitions/CouponForm' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: { $ref: '#/definitions/CouponForm' }
                    },
                    '201': { description: 'Created' },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        },
        '/v1/tournaments': {
            get: {
                tags: ['line-controller'],
                summary:
                    'Получение дерева турниров спортивных мероприятий для указанных вида спорта и категории',
                operationId: 'getTournamentListUsingGET',
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'categoryId',
                        in: 'query',
                        description: 'Идентификатор категории',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                        allowEmptyValue: false,
                        'x-example': 1
                    },
                    {
                        name: 'mode',
                        in: 'query',
                        description: 'Статус спортивного события',
                        required: true,
                        type: 'string',
                        allowEmptyValue: false,
                        enum: ['LINE', 'LIVE', 'FINISHED']
                    },
                    {
                        name: 'sportId',
                        in: 'query',
                        description: 'Идентификатор вида спорта',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                        allowEmptyValue: false,
                        'x-example': 1
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/TournamentTreeElement'
                            }
                        }
                    },
                    '401': { description: 'Unauthorized' },
                    '403': { description: 'Forbidden' },
                    '404': { description: 'Not Found' }
                },
                deprecated: false
            }
        }
    },
    definitions: {
        CategoryTreeElement: {
            type: 'object',
            required: [
                'categoryId',
                'categoryName',
                'ordinal',
                'sportId',
                'sportName'
            ],
            properties: {
                categoryId: {
                    type: 'integer',
                    format: 'int64',
                    example: 1,
                    description:
                        'Идентификатор категории (по ТЗ это тип категории/страна)'
                },
                categoryName: {
                    type: 'string',
                    description:
                        'Название категории (по ТЗ это тип категории/страна)'
                },
                color: {
                    type: 'string',
                    description: 'Цвет иконки вида спорта'
                },
                count: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Количество спортивных мероприятий для выбранного элемента'
                },
                imageUrl: {
                    type: 'string',
                    description: 'Иконка категории (страны)'
                },
                ordinal: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Порядок следования (возможно стоит не передавать этот параметр, а сразу упорядочивать на сервере). Если 0 - в конце списка.'
                },
                sportId: {
                    type: 'integer',
                    format: 'int64',
                    example: 1,
                    description: 'Идентификатор вида спорта'
                },
                sportName: {
                    type: 'string',
                    description: 'Название вида спорта'
                }
            },
            title: 'CategoryTreeElement'
        },
        CompetitorElement: {
            type: 'object',
            required: ['id', 'name'],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Идентификатор соперника'
                },
                name: { type: 'string', description: 'Имя-название соперника' }
            },
            title: 'CompetitorElement'
        },
        CouponForm: {
            type: 'object',
            properties: {
                playerId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Id клиента'
                },
                steps: {
                    type: 'array',
                    description: 'Шаги',
                    items: { $ref: '#/definitions/CouponStepForm' }
                }
            },
            title: 'CouponForm'
        },
        CouponStepForm: {
            type: 'object',
            properties: {
                events: {
                    type: 'array',
                    description: 'Шаги',
                    items: { $ref: '#/definitions/EventForm' }
                },
                m: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Количество событий участвующих в расчете пари "Экспресс" (присылать если type in (EXPRESS, SYSTEM)'
                },
                n: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Количество полученных Экспрессов (присылать если type in (EXPRESS, SYSTEM)'
                },
                odds: {
                    type: 'number',
                    description:
                        'Коэффициент шага(присылать если type in (EXPRESS, SYSTEM)'
                },
                rate: {
                    type: 'number',
                    description:
                        'Ставка(присылать если type in (EXPRESS, SYSTEM)'
                },
                type: {
                    type: 'string',
                    description: 'Тип купона',
                    enum: ['ORDINAR', 'EXPRESS', 'SYSTEM']
                }
            },
            title: 'CouponStepForm'
        },
        EventForm: {
            type: 'object',
            properties: {
                active: { type: 'boolean' },
                odds: { type: 'number', description: 'Коэффициент шага' },
                rate: {
                    type: 'number',
                    description: 'Ставка(только для Ordinar)'
                },
                selectionId: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Идентификатор события'
                }
            },
            title: 'EventForm'
        },
        FixtureElement: {
            type: 'object',
            required: [
                'categoryId',
                'categoryName',
                'competitor1',
                'competitor2',
                'fixtureId',
                'ordinal',
                'sportId',
                'sportName',
                'startTime',
                'tournamentId',
                'tournamentName'
            ],
            properties: {
                categoryId: {
                    type: 'integer',
                    format: 'int64',
                    example: 1,
                    description:
                        'Идентификатор категории (по ТЗ это тип категории/страна)'
                },
                categoryName: {
                    type: 'string',
                    description:
                        'Название категории (по ТЗ это тип категории/страна)'
                },
                color: {
                    type: 'string',
                    description: 'Цвет иконки вида спорта'
                },
                competitionName: {
                    type: 'string',
                    description: 'Название спортивного мероприятия'
                },
                competitor1: {
                    description: 'Соперник, выступающий "дома"',
                    $ref: '#/definitions/CompetitorElement'
                },
                competitor2: {
                    description: 'Соперник, выступающий "в гостях"',
                    $ref: '#/definitions/CompetitorElement'
                },
                count: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Количество спортивных мероприятий для выбранного элемента'
                },
                fixtureId: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Идентификатор спортивного мероприятия'
                },
                imageUrl: {
                    type: 'string',
                    description: 'Иконка категории (страны)'
                },
                markets: {
                    type: 'array',
                    description:
                        'Список маркетов спортивного мероприятия (событий)',
                    items: { $ref: '#/definitions/MarketElement' }
                },
                ordinal: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Порядок следования (возможно стоит не передавать этот параметр, а сразу упорядочивать на сервере). Если 0 - в конце списка.'
                },
                roundName: { type: 'string', description: 'Этап турнира' },
                sportId: {
                    type: 'integer',
                    format: 'int64',
                    example: 1,
                    description: 'Идентификатор вида спорта'
                },
                sportName: {
                    type: 'string',
                    description: 'Название вида спорта'
                },
                startTime: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Планируемая дата и время начала мероприятия'
                },
                statistics: {
                    description: 'Результаты матча',
                    $ref: '#/definitions/MatchStatsDto'
                },
                tournamentId: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Идентификатор турнира (по ТЗ это категория)'
                },
                tournamentName: {
                    type: 'string',
                    description: 'Название турнира (по ТЗ это категория)'
                }
            },
            title: 'FixtureElement'
        },
        MarketElement: {
            type: 'object',
            required: ['id', 'name', 'selections', 'status'],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Идентификатор маркета (события)'
                },
                name: {
                    type: 'string',
                    description: 'Название маркета (события)'
                },
                selections: {
                    type: 'array',
                    description: 'Список вариантов исхода события',
                    items: { $ref: '#/definitions/SelectionElement' }
                },
                status: {
                    type: 'string',
                    description: 'Статус маркета (события)',
                    enum: [
                        'ACTIVE',
                        'SUSPENDED',
                        'DEACTIVATED',
                        'SETTLED',
                        'CANCELLED',
                        'HANDED_OVER'
                    ]
                }
            },
            title: 'MarketElement'
        },
        MatchStatsDto: {
            type: 'object',
            properties: {
                matchState: {
                    type: 'string',
                    description: 'Текущее состояние матча'
                },
                periodEndTime: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Время окончания текущего тайма/периода'
                },
                periodScores: {
                    type: 'object',
                    description:
                        'Счет в соревновании по периодам/таймам/сетам и т.д.',
                    additionalProperties: { $ref: '#/definitions/Score' }
                },
                redCards: {
                    description: 'Количество красных карточек',
                    $ref: '#/definitions/Score'
                },
                score: {
                    description: 'Счет в матче',
                    $ref: '#/definitions/Score'
                },
                winner: {
                    type: 'string',
                    description: 'Победитель соревования'
                },
                ylwCards: {
                    description: 'Количество желтых карточек',
                    $ref: '#/definitions/Score'
                }
            },
            title: 'MatchStatsDto'
        },
        PlayerModel: {
            type: 'object',
            properties: {
                balance: { type: 'number', description: 'Баланс' },
                email: { type: 'string', description: 'Email' },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Идентификатор пользователя'
                },
                isNew: {
                    type: 'boolean',
                    description: 'Является ли данный пользователь новым'
                },
                maxRate: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Максимальный размер шага'
                },
                phone: { type: 'string', description: 'Телефон' }
            },
            title: 'PlayerModel'
        },
        Score: {
            type: 'object',
            properties: {
                competitor1: { type: 'integer', format: 'int32' },
                competitor2: { type: 'integer', format: 'int32' }
            },
            title: 'Score'
        },
        SelectionElement: {
            type: 'object',
            required: ['id', 'name', 'odds', 'oddsDirection'],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Идентификатор варианта исхода события'
                },
                locked: {
                    type: 'boolean',
                    description:
                        'Признак блокировки исхода события, в случае отсутствия - не заблокирован'
                },
                name: {
                    type: 'string',
                    description: 'Название варианта исхода события'
                },
                odds: {
                    type: 'number',
                    description: 'Коэффициент варианта исхода события'
                },
                oddsDirection: {
                    type: 'string',
                    description:
                        'Направление изменения коэффициента, [INCREASED - повышение, DECREASED- понижение, NOT_CHANGED - без изменений]',
                    enum: ['INCREASED', 'DECREASED', 'NOT_CHANGED']
                }
            },
            title: 'SelectionElement'
        },
        SportTreeElement: {
            type: 'object',
            required: ['ordinal', 'sportId', 'sportName'],
            properties: {
                color: {
                    type: 'string',
                    description: 'Цвет иконки вида спорта'
                },
                count: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Количество спортивных мероприятий для выбранного элемента'
                },
                imageUrl: { type: 'string', description: 'Иконка вида спорта' },
                ordinal: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Порядок следования (возможно стоит не передавать этот параметр, а сразу упорядочивать на сервере). Если 0 - в конце списка.'
                },
                sportId: {
                    type: 'integer',
                    format: 'int64',
                    example: 1,
                    description: 'Идентификатор вида спорта'
                },
                sportName: {
                    type: 'string',
                    description: 'Название вида спорта'
                }
            },
            title: 'SportTreeElement'
        },
        StepForm: {
            type: 'object',
            properties: {
                date: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Дата совершения ставки'
                },
                fixture: {
                    description: 'Информация о матче',
                    $ref: '#/definitions/FixtureElement'
                },
                id: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Идентификатор шага'
                },
                market: { type: 'string', description: 'Название маркета' },
                odds: { type: 'number', description: 'Коэффициент шага' },
                rate: { type: 'number', description: 'Ставка' },
                selection: { type: 'string', description: 'Название события' },
                status: {
                    type: 'string',
                    description:
                        'Статус шага, [WAITING - Ожидание результата, REFUND - Возврат ставки, CANCELED - отмена ставки, IN_PLAY - В Игре (если не расчитана ставка, а матч LIVE), CALCULATED - расчитана, NO_CALCULATED - не расчитана]',
                    enum: [
                        'WAITING',
                        'REFUND',
                        'CANCELED',
                        'IN_PLAY',
                        'CALCULATED',
                        'NO_CALCULATED'
                    ]
                },
                steps: {
                    type: 'array',
                    description:
                        'Шаги, которые входят мультишаг, [List of StepForm]',
                    items: { $ref: '#/definitions/StepForm' }
                },
                type: {
                    type: 'string',
                    description: 'Тип шага',
                    enum: ['ORDINAR', 'EXPRESS', 'SYSTEM']
                },
                typeName: { type: 'string', description: 'Тип шага(перевод)' },
                win: { type: 'number', description: 'Результат' },
                winning: { type: 'boolean' }
            },
            title: 'StepForm'
        },
        TournamentTreeElement: {
            type: 'object',
            required: [
                'categoryId',
                'categoryName',
                'ordinal',
                'sportId',
                'sportName',
                'tournamentId',
                'tournamentName'
            ],
            properties: {
                categoryId: {
                    type: 'integer',
                    format: 'int64',
                    example: 1,
                    description:
                        'Идентификатор категории (по ТЗ это тип категории/страна)'
                },
                categoryName: {
                    type: 'string',
                    description:
                        'Название категории (по ТЗ это тип категории/страна)'
                },
                color: {
                    type: 'string',
                    description: 'Цвет иконки вида спорта'
                },
                count: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Количество спортивных мероприятий для выбранного элемента'
                },
                imageUrl: {
                    type: 'string',
                    description: 'Иконка категории (страны)'
                },
                ordinal: {
                    type: 'integer',
                    format: 'int32',
                    description:
                        'Порядок следования (возможно стоит не передавать этот параметр, а сразу упорядочивать на сервере). Если 0 - в конце списка.'
                },
                sportId: {
                    type: 'integer',
                    format: 'int64',
                    example: 1,
                    description: 'Идентификатор вида спорта'
                },
                sportName: {
                    type: 'string',
                    description: 'Название вида спорта'
                },
                tournamentId: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Идентификатор турнира (по ТЗ это категория)'
                },
                tournamentName: {
                    type: 'string',
                    description: 'Название турнира (по ТЗ это категория)'
                }
            },
            title: 'TournamentTreeElement'
        }
    }
};
// tslint:disable

/// <reference path="../../typings/tsd.d.ts" />
