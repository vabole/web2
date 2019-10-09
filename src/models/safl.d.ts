declare namespace Safl {
    export interface TournamentTreeElement {
        // Идентификатор категории (по ТЗ это тип категории/страна)
        categoryId: number;
        // Название категории (по ТЗ это тип категории/страна)
        categoryName: string;
        // Цвет иконки вида спорта
        color?: string;
        // Количество спортивных мероприятий для выбранного элемента
        count: number;
        // Иконка категории (страны)
        imageUrl?: string;
        // Порядок следования (возможно стоит не передавать этот параметр, а сразу упорядочивать на сервере). Если 0 - в конце списка.
        ordinal: number;
        // Идентификатор вида спорта
        sportId: number;
        // Название вида спорта
        sportName: string;
        // Идентификатор турнира (по ТЗ это категория)
        tournamentId: number;
        // Название турнира (по ТЗ это категория)
        tournamentName: string;
    }
    export interface StepForm {
        // Дата совершения ставки
        date?: string;
        // Информация о матче
        fixture?: FixtureElement;
        // Идентификатор шага
        id?: number;
        // Название маркета
        market?: string;
        // Коэффициент шага
        odds?: number;
        // Ставка
        rate?: number;
        // Название события
        selection?: string;
        // Статус шага, [WAITING - Ожидание результата, REFUND - Возврат ставки, CANCELED - отмена ставки, IN_PLAY - В Игре (если не расчитана ставка, а матч LIVE), CALCULATED - расчитана, NO_CALCULATED - не расчитана]
        status?:
            | 'WAITING'
            | 'REFUND'
            | 'CANCELED'
            | 'IN_PLAY'
            | 'CALCULATED'
            | 'NO_CALCULATED';
        // Шаги, которые входят мультишаг, [List of StepForm]
        steps?: StepForm[];
        // Тип шага
        type?: 'ORDINAR' | 'EXPRESS' | 'SYSTEM';
        // Тип шага(перевод)
        typeName?: string;
        // Результат
        win?: number;
        winning?: boolean;
    }
    export interface SportTreeElement {
        // Цвет иконки вида спорта
        color?: string;
        // Количество спортивных мероприятий для выбранного элемента
        count: number;
        // Иконка вида спорта
        imageUrl?: string;
        // Порядок следования (возможно стоит не передавать этот параметр, а сразу упорядочивать на сервере). Если 0 - в конце списка.
        ordinal: number;
        // Идентификатор вида спорта
        sportId: number;
        // Название вида спорта
        sportName: string;
    }
    export interface SelectionElement {
        // Идентификатор варианта исхода события
        id: number;
        // Признак блокировки исхода события, в случае отсутствия - не заблокирован
        locked?: boolean;
        // Название варианта исхода события
        name: string;
        // Коэффициент варианта исхода события
        odds: number;
        // Направление изменения коэффициента, [INCREASED - повышение, DECREASED- понижение, NOT_CHANGED - без изменений]
        oddsDirection: 'INCREASED' | 'DECREASED' | 'NOT_CHANGED';
    }
    export interface Score {
        competitor1?: number;
        competitor2?: number;
    }
    export interface PlayerModel {
        // Баланс
        balance?: number;
        // Email
        email?: string;
        // Идентификатор пользователя
        id?: string;
        // Является ли данный пользователь новым
        isNew?: boolean;
        // Максимальный размер шага
        maxRate?: number;
        // Телефон
        phone?: string;
    }
    export interface MatchStatsDto {
        // Текущее состояние матча
        matchState?: string;
        // Время окончания текущего тайма/периода
        periodEndTime?: string;
        // Счет в соревновании по периодам/таймам/сетам и т.д.
        periodScores?: object;
        // Количество красных карточек
        redCards?: Score;
        // Счет в матче
        score?: Score;
        // Победитель соревования
        winner?: string;
        // Количество желтых карточек
        ylwCards?: Score;
    }
    export interface MarketElement {
        // Идентификатор маркета (события)
        id: number;
        // Название маркета (события)
        name: string;
        // Список вариантов исхода события
        selections: SelectionElement[];
        // Статус маркета (события)
        status:
            | 'ACTIVE'
            | 'SUSPENDED'
            | 'DEACTIVATED'
            | 'SETTLED'
            | 'CANCELLED'
            | 'HANDED_OVER';
    }
    export interface FixtureElement {
        // Идентификатор категории (по ТЗ это тип категории/страна)
        categoryId: number;
        // Название категории (по ТЗ это тип категории/страна)
        categoryName: string;
        // Цвет иконки вида спорта
        color?: string;
        // Название спортивного мероприятия
        competitionName?: string;
        // Соперник, выступающий "дома"
        competitor1: CompetitorElement;
        // Соперник, выступающий "в гостях"
        competitor2: CompetitorElement;
        // Количество спортивных мероприятий для выбранного элемента

        /* manually redacted */
        count?: number;
        // Идентификатор спортивного мероприятия
        fixtureId: number;
        // Иконка категории (страны)
        imageUrl?: string;
        // Список маркетов спортивного мероприятия (событий)
        markets: MarketElement[];
        // Порядок следования (возможно стоит не передавать этот параметр, а сразу упорядочивать на сервере). Если 0 - в конце списка.
        ordinal: number;
        // Этап турнира
        roundName?: string;
        // Идентификатор вида спорта
        sportId: number;
        // Название вида спорта
        sportName: string;
        // Планируемая дата и время начала мероприятия
        startTime: string;
        // Результаты матча
        statistics?: MatchStatsDto;
        // Идентификатор турнира (по ТЗ это категория)
        tournamentId: number;
        // Название турнира (по ТЗ это категория)
        tournamentName: string;
    }
    export interface EventForm {
        active?: boolean;
        // Коэффициент шага
        odds?: number;
        // Ставка(только для Ordinar)
        rate?: number;
        // Идентификатор события
        selectionId?: number;
    }
    export interface CouponStepForm {
        // Шаги
        events?: EventForm[];
        // Количество событий участвующих в расчете пари "Экспресс" (присылать если type in (EXPRESS, SYSTEM)
        m?: number;
        // Количество полученных Экспрессов (присылать если type in (EXPRESS, SYSTEM)
        n?: number;
        // Коэффициент шага(присылать если type in (EXPRESS, SYSTEM)
        odds?: number;
        // Ставка(присылать если type in (EXPRESS, SYSTEM)
        rate?: number;
        // Тип купона
        type?: 'ORDINAR' | 'EXPRESS' | 'SYSTEM';
    }
    export interface CouponForm {
        // Id клиента
        playerId?: string;
        // Шаги
        steps?: CouponStepForm[];
    }
    export interface CompetitorElement {
        // Идентификатор соперника
        id: number;
        // Имя-название соперника
        name: string;
    }
    export interface CategoryTreeElement {
        // Идентификатор категории (по ТЗ это тип категории/страна)
        categoryId: number;
        // Название категории (по ТЗ это тип категории/страна)
        categoryName: string;
        // Цвет иконки вида спорта
        color?: string;
        // Количество спортивных мероприятий для выбранного элемента
        count: number;
        // Иконка категории (страны)
        imageUrl?: string;
        // Порядок следования (возможно стоит не передавать этот параметр, а сразу упорядочивать на сервере). Если 0 - в конце списка.
        ordinal: number;
        // Идентификатор вида спорта
        sportId: number;
        // Название вида спорта
        sportName: string;
    }
}
