import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';

import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { MétierRecherchéService } from '~/client/services/alternances/métierRecherché.service';
import { AnalyticsService } from '~/client/services/analyticsService';
import { AnalyticsServiceFake } from '~/client/services/analyticsServiceFake';
import { FicheMetierService } from '~/client/services/ficheMetier/ficheMetier.service';
import { HttpClientService } from '~/client/services/httpClient.service';
import {
  LesEntreprisesSEngagentService,
} from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { LocalisationService } from '~/client/services/localisation.service';
import { LoggerService } from '~/client/services/logger.service';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

import { DemandeDeContactService } from './services/demandeDeContact.service';

const MAX_LIMITE_STAGES = 100000;

export type Dependency = Dependencies[keyof Dependencies];
export type Dependencies = {
  alternanceService: AlternanceService
  localisationService: LocalisationService
  ficheMetierService: FicheMetierService
  métierRecherchéService: MétierRecherchéService
  missionEngagementService: MissionEngagementService
  offreEmploiService: OffreEmploiService
  rechercheClientService: SearchClient
  demandeDeContactService: DemandeDeContactService
  lesEntreprisesSEngagementService: LesEntreprisesSEngagentService
  analyticsService: AnalyticsService | AnalyticsServiceFake
}

class DependencyInitException extends Error {
  constructor(dependencyName: string, reason: string) {
    super(`Cannot init ${dependencyName} dependency, reason: ${reason}`);
  }
}

export default function dependenciesContainer(sessionId: string): Dependencies {
  const loggerService = new LoggerService(sessionId);
  const analyticsService = process.env.NODE_ENV === 'production' ?  new AnalyticsService() : new AnalyticsServiceFake();
  const httpClientService =  new HttpClientService(sessionId, loggerService);
  const offreEmploiService = new OffreEmploiService(httpClientService);
  const localisationService = new LocalisationService(httpClientService);
  const alternanceService = new AlternanceService(httpClientService);
  const métierRecherchéService = new MétierRecherchéService(httpClientService);
  const missionEngagementService = new MissionEngagementService(httpClientService);
  const demandeDeContactService = new DemandeDeContactService(httpClientService);
  const ficheMetierService = new FicheMetierService(httpClientService);
  const lesEntreprisesSEngagementService = new LesEntreprisesSEngagentService(httpClientService);

  const meiliSearchBaseUrl = process.env.NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL;
  const meiliSearchApiKey = process.env.NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY;

  if (!meiliSearchApiKey || !meiliSearchBaseUrl) {
    throw new DependencyInitException(
      'rechercheClientService',
      'NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL or NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY environment variable is missing',
    );
  }

  const rechercheClientService = instantMeiliSearch(
    meiliSearchBaseUrl,
    meiliSearchApiKey,
    { keepZeroFacets: true, paginationTotalHits: MAX_LIMITE_STAGES },
  );

  return {
    alternanceService,
    analyticsService,
    demandeDeContactService,
    ficheMetierService,
    lesEntreprisesSEngagementService,
    localisationService,
    missionEngagementService,
    métierRecherchéService,
    offreEmploiService,
    rechercheClientService,
  };
}
