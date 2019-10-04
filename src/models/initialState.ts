import { normalize, schema } from "normalizr";
import { fixtures as sampleFixturesJSON } from "./sample-data/fixtures";

import {
  CategoryFull,
  FixtureFull,
  MatchStatus,
  NormalizedState,
  SportFull,
  TournamentFull
} from "./types";
import _ from "lodash";

function sportFromFixture(fixture: Safl.FixtureElement): SportFull {
  const { sportId, ...sport } = fixture;
  return {
    ...sport,
    id: String(sportId),
    categories: { [fixture.categoryId]: categoryFromFixture(fixture) }
  };
}

function categoryFromFixture(fixture: Safl.FixtureElement): CategoryFull {
  const { categoryId, ...category } = fixture;
  return {
    ...category,
    id: String(categoryId),
    tournaments: { [fixture.tournamentId]: tournamentFromFixture(fixture) }
  };
}

function tournamentFromFixture(fixture: Safl.FixtureElement): TournamentFull {
  const { tournamentId, ...tournament } = fixture;
  return {
    ...tournament,
    id: String(tournamentId),
    fixtures: { [fixture.fixtureId]: getFixtureFromSaflFixture(fixture) }
  };
}

/**
 * Добавляем к Fixture status,
 * поле id заменяем на fixtureId
 */
function getFixtureFromSaflFixture(
  saflFixture: Safl.FixtureElement,
  status: MatchStatus = "LIVE"
): FixtureFull {
  const { fixtureId, ...fixture } = saflFixture;
  return {
    ...fixture,
    id: String(fixtureId),
    status
  };
}

const fixtureEntity = new schema.Entity(
  "fixtures",
  {},
  { mergeStrategy: _.merge }
);
const tournamentEntity = new schema.Entity(
  "tournaments",
  { fixtures: [fixtureEntity] },
  { mergeStrategy: _.merge }
);
const categoryEntity = new schema.Entity(
  "categories",
  { tournaments: [tournamentEntity] },
  { mergeStrategy: _.merge }
);
const sportEntity = new schema.Entity(
  "sports",
  { categories: [categoryEntity] },
  { mergeStrategy: _.merge }
);

type IndexedSports = {
  [key: string]: SportFull;
};
/**
 * convert to internal model
 */
const prepareFixtures = (fixtures: Safl.FixtureElement[]): IndexedSports =>
  fixtures.map(sportFromFixture).reduce(
    (acc, sport) => {
      if (sport.id in acc) {
        acc[sport.id] = _.merge(acc[sport.id], sport);
      } else {
        acc[sport.id] = sport;
      }
      return acc;
    },
    {} as IndexedSports
  );

export const initialState: NormalizedState = normalize(
  prepareFixtures(sampleFixturesJSON),
  [sportEntity]
);

export const normalizeFixtures = (
  fixtures: Safl.FixtureElement[]
): NormalizedState => normalize(prepareFixtures(fixtures), [sportEntity]);
