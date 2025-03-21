import { aRechercheAdresseResponse } from '@tests/fixtures/services/apiAdresseHttpClientService.fixture';
import { aRechercheCommuneResponse } from '@tests/fixtures/services/apiGeoHttpClientService.fixture';

import {
  mapLocalisationList,
  mapRésultatsRechercheCommune,
} from '~/server/localisations/infra/repositories/apiLocalisation.mapper';

describe('mapper pour les api de geo localisation', () => {
  describe('mapLocalisationList', () => {
    it('retourne la liste des localisations trouvées par l api decoupage administratif', () => {
      const result = mapLocalisationList(aRechercheCommuneResponse().data);

      expect(result).toEqual([{ code: '36200', nom: 'Chavin' }, { code: '92370', nom: 'Chaville' }]);
    });
  });

  describe('mapRésultatsRechercheCommune', () => {
    it('retourne la liste des adresses trouvées par l api adresse', () => {
      const result = mapRésultatsRechercheCommune(aRechercheAdresseResponse().data);

      expect(result).toEqual({
        résultats: [
          {
            code: '93005',
            codePostal: '93600',
            coordonnées: {
              latitude: 48.926541,
              longitude: 2.493832,
            },
            libelle: '20 Avenue Jules Jouy Aulnay-sous-Bois (93600)',
            ville: 'Aulnay-sous-Bois',
          },
          {
            code: '28201',
            codePostal: '28300',
            coordonnées: {
              latitude: 48.510887,
              longitude: 1.553914,
            },
            libelle: '20 Avenue de la Gare Jouy (28300)',
            ville: 'Jouy',
          },
        ],
      });
    });
  });
});
