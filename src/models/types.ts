import { RouterState } from 'connected-react-router';
import { couponState } from './reducer';

export type SportFull = Omit<
    Safl.SportTreeElement,
    'sportId' | 'count' | 'ordinal'
> & {
    id: string;
    categories: { [id: string]: CategoryFull };
    count?: number;
    ordinal?: number;
};

export type CategoryFull = Omit<
    Safl.CategoryTreeElement,
    'categoryId' | 'count' | 'ordinal'
> & {
    // export type CategoryFull = Safl.CategoryTreeElement & {
    tournaments: { [id: string]: TournamentFull };
    id: string;
    count?: number;
    ordinal?: number;
};

export type TournamentFull = Omit<
    Safl.TournamentTreeElement,
    'tournamentId' | 'count' | 'ordinal'
> & {
    id: string;
    fixtures: { [id: string]: FixtureFull };
    count?: number;
    ordinal?: number;
};

export type MatchStatus =
    | 'LIVE'
    | 'NOT_STARTED'
    | 'SUSPENDED'
    | 'ENDED'
    | 'FINISHED'
    | 'CANCELLED'
    | 'ABANDONED'
    | 'DELAYED'
    | 'UNKNOWN';

export type FixtureFull = Omit<Safl.FixtureElement, 'fixtureId'> & {
    id: string;
    status: MatchStatus;
};

export type SpirsState = {
    spirs: {
        fixtures: NormalizedState;
        playerInfo: Safl.PlayerModel;
        steps: Safl.StepForm[];
        coupons: couponState;
    };
    router: RouterState;
};

export type NormalizedState = { entities: StateEntities; result?: number[] };

export type SportState = { [key: string]: SportStateObject };
export type CategoriesState = { [key: string]: CategoryStateObject };
export type TournamentsState = { [key: string]: TournamentStateObject };
export type FixturesState = { [key: string]: FixtureStateObject };

export type StateEntities = {
    sports: SportState | null;
    categories: CategoriesState | null;
    tournaments: TournamentsState | null;
    fixtures: FixturesState | null;
};

export type SportStateObject = Omit<SportFull, 'categories'> & {
    categories: string[];
};

export type CategoryStateObject = Omit<CategoryFull, 'tournaments'> & {
    tournaments: string[];
};

export type TournamentStateObject = Omit<TournamentFull, 'fixtures'> & {
    fixtures: string[];
};

export type FixtureStateObject = FixtureFull;

export type FixtureStatus =
    | 'NOT_STARTED'
    | 'LIVE'
    | 'SUSPENDED'
    | 'ENDED'
    | 'FINISHED'
    | 'CANCELLED'
    | 'ABANDONED'
    | 'DELAYED'
    | 'UNKNOWN';

export const couponTypeArray = ['ORDINAR', 'EXPRESS', 'SYSTEM'] as const;
