import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterFicheMetierUseCase } from '~/server/cms/useCases/consulterFicheMetier.useCase';
import { ConsulterMentionObligatoireUseCase } from '~/server/cms/useCases/consulterMentionObligatoireUseCase';
import { RécupérerMesuresEmployeursUseCase } from '~/server/cms/useCases/récupérerMesuresEmployeursUseCase';
import { RécupérerMesuresJeunesUseCase } from '~/server/cms/useCases/récupérerMesuresJeunesUseCase';
import { ConfigurationService } from '~/server/services/configuration.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface CmsDependencies {
  consulterArticle: ConsulterArticleUseCase
  consulterFicheMetier: ConsulterFicheMetierUseCase
  consulterMentionObligatoire: ConsulterMentionObligatoireUseCase
  duréeDeValiditéEnSecondes: () => number
  récupérerMesuresJeunes: RécupérerMesuresJeunesUseCase
  récupérerMesuresEmployeurs: RécupérerMesuresEmployeursUseCase
}

const UN_JOUR_EN_SECONDES = 60 * 60 * 24;

export const cmsDependenciesContainer = (httpClientService: HttpClientService, configurationService: ConfigurationService): CmsDependencies => {
  const repository = new StrapiCmsRepository(httpClientService);
  const { IS_REVIEW_APP } = configurationService.getConfiguration();
  const duréeDeValiditéEnSecondes = IS_REVIEW_APP ? 20 : UN_JOUR_EN_SECONDES;

  return {
    consulterArticle: new ConsulterArticleUseCase(repository),
    consulterFicheMetier: new ConsulterFicheMetierUseCase(repository),
    consulterMentionObligatoire: new ConsulterMentionObligatoireUseCase(repository),
    duréeDeValiditéEnSecondes: () => duréeDeValiditéEnSecondes,
    récupérerMesuresEmployeurs: new RécupérerMesuresEmployeursUseCase(repository),
    récupérerMesuresJeunes: new RécupérerMesuresJeunesUseCase(repository),
  };
};
