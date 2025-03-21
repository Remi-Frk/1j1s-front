import {
  aBarmanOffreEmploi,
  anOffreEmploiEchantillonFiltre,
  anOffreEmploiFiltre,
  anOffreJobEtudiantEchantillonFiltre,
  aRésultatsRechercheOffreEmploi,
} from '@tests/fixtures/domain/offreEmploi.fixture';
import {
  aApiPoleEmploiRéférentielRepository,
} from '@tests/fixtures/server/offresEmploi/apiPoleEmploiRéférentiel.repository.fixture';
import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';
import {
  aPoleEmploiHttpClient,
  aRésultatsRechercheOffreEmploiResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import { createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { OffreEmploi, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import {
  mapOffreEmploi,
  mapRésultatsRechercheOffreEmploi,
  mapRésultatsRechercheOffreEmploiResponse,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploi.mapper';
import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

describe('ApiPoleEmploiOffreRepository', () => {
  let httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification;
  let apiPoleEmploiOffreRepository: ApiPoleEmploiOffreRepository;
  let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;
  let cacheService: CacheService;

  beforeEach(() => {
    cacheService = new MockedCacheService();
    httpClientServiceWithAuthentification = aPoleEmploiHttpClient();
    apiPoleEmploiRéférentielRepository = aApiPoleEmploiRéférentielRepository();
    apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository, cacheService);
  });

  describe('getOffreEmploi', () => {
    describe('quand l\'offre d\'emploi est trouvé', () => {
      it('récupère l\'offre d\'emploi selon l\'id', async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aBarmanOffreEmploi()));
        const expected = aBarmanOffreEmploi();
        const offreEmploiId = expected.id;

        const { result } = await apiPoleEmploiOffreRepository.getOffreEmploi(offreEmploiId) as Success<OffreEmploi>;

        expect(result).toEqual(expected);
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
          '/132LKFB',
          mapOffreEmploi,
        );
      });
    });
  });

  describe('searchOffreEmploi', () => {
    describe("quand la recherche est lancée automatiquement pour les offres d'emplois", () => {
      describe('quand les informations ne sont pas encore mis en cache', () => {
        it("fait l'appel à l'api et set les informations dans le cache", async () => {
          jest
            .spyOn(httpClientServiceWithAuthentification, 'get')
            .mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploiResponse()));

          jest.spyOn(cacheService, 'get').mockResolvedValue(null);
          jest.spyOn(cacheService, 'set');

          const offreFiltre = anOffreEmploiEchantillonFiltre();

          const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreFiltre) as Success<RésultatsRechercheOffreEmploi>;


          expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_EMPLOI_KEY');

          expect(result).toEqual(aRésultatsRechercheOffreEmploi());
          expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
            '/search?range=0-14',
            mapRésultatsRechercheOffreEmploiResponse,
          );

          expect(cacheService.set).toHaveBeenCalledWith('ECHANTILLON_OFFRE_EMPLOI_KEY', aRésultatsRechercheOffreEmploiResponse(), 24);
        });
      });

      describe('quand les informations sont déjà en cache', () => {
        it("ne fait pas l'appel à l'api et get les informations du cache", async () => {
          jest.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiResponse());
          jest.spyOn(cacheService, 'set');

          const offreFiltre = anOffreEmploiEchantillonFiltre();

          const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreFiltre) as Success<RésultatsRechercheOffreEmploi>;

          expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_EMPLOI_KEY');

          expect(result).toEqual(aRésultatsRechercheOffreEmploi());
          expect(httpClientServiceWithAuthentification.get).not.toHaveBeenCalled();

          expect(cacheService.set).not.toHaveBeenCalled();
        });

      });
    });

    describe('quand la recherche est lancée automatiquement pour les offres de jobs étudiants', () => {
      describe('quand les informations ne sont pas encore mis en cache', () => {
        it("fait l'appel à l'api et set les informations dans le cache", async () => {
          jest
            .spyOn(httpClientServiceWithAuthentification, 'get')
            .mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploiResponse()));

          jest.spyOn(cacheService, 'get').mockResolvedValue(null);
          jest.spyOn(cacheService, 'set');

          const offreFiltre = anOffreJobEtudiantEchantillonFiltre();

          const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreFiltre) as Success<RésultatsRechercheOffreEmploi>;

          expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY');

          expect(result).toEqual(aRésultatsRechercheOffreEmploi());
          expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
            '/search?range=0-14&dureeHebdoMax=1600&tempsPlein=false&typeContrat=CDD,MIS,SAI',
            mapRésultatsRechercheOffreEmploiResponse,
          );

          expect(cacheService.set).toHaveBeenCalledWith('ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY', aRésultatsRechercheOffreEmploiResponse(), 24);
        });
      });

      describe('quand les informations sont déjà en cache', () => {
        it("ne fait pas l'appel à l'api et get les informations du cache", async () => {

          jest.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiResponse());
          jest.spyOn(cacheService, 'set');

          const offreFiltre = anOffreJobEtudiantEchantillonFiltre();

          const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreFiltre) as Success<RésultatsRechercheOffreEmploi>;

          expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY');

          expect(result).toEqual(aRésultatsRechercheOffreEmploi());
          expect(httpClientServiceWithAuthentification.get).not.toHaveBeenCalled();

          expect(cacheService.set).not.toHaveBeenCalled();
        });
      });
    });

    describe("quand la recherche est lancée par l'utilisateur", () => {
      it("ne get pas les informations du cache et fait appel à l'api avec les filtres", async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));

        jest.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiResponse());
        jest.spyOn(cacheService, 'set');

        const offreFiltre = anOffreEmploiFiltre();

        const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreFiltre) as Success<RésultatsRechercheOffreEmploi>;

        expect(cacheService.get).not.toHaveBeenCalled();

        expect(result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalled();

        expect(cacheService.set).not.toHaveBeenCalled();
      });
    });

    describe('quand la range est supérieur à 1149', () => {
      it('renvoie une erreur DEMANDE_INCORRECTE', async () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({ localisation: undefined, page: 1001 });

        const { errorType } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Failure;

        expect(errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
      });
    });

    describe('quand nombre de résultat est présent dans la réponse', () => {
      it('recherche les offres d\'emploi de pole emploi', async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));
        const offreEmploiFiltre = anOffreEmploiFiltre();

        const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Success<RésultatsRechercheOffreEmploi>;

        expect(result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
          '/search?motsCles=boulanger&range=0-14&typeContrat=CDD%2CCDI&region=34',
          mapRésultatsRechercheOffreEmploi,
        );
      });

      it('recherche les offres d\'emploi de pole emploi avec une localisation qui est une commune on va rechercher le code insee sur le référentiel de pole emploi', async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));
        jest
          .spyOn(apiPoleEmploiRéférentielRepository, 'findCodeInseeInRéférentielCommune')
          .mockResolvedValue('75101');

        const offreEmploiFiltre = anOffreEmploiFiltre({
          localisation: {
            code: '75001',
            type: TypeLocalisation.COMMUNE,
          },
        });

        const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Success<RésultatsRechercheOffreEmploi>;

        expect(result.result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
          '/search?motsCles=boulanger&range=0-14&typeContrat=CDD%2CCDI&commune=75101',
          mapRésultatsRechercheOffreEmploi,
        );
      });
    });
  });

});
