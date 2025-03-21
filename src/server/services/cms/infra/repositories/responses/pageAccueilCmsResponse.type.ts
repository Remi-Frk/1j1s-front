import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export interface PageAccueilCmsResponse {
  articles: PageAccueilCmsResponse.ArticleCmsResponse[];
}

export namespace PageAccueilCmsResponse {
  export interface ArticleCmsResponse {
    titre: string;
    description: string;
    image: Strapi.Image;
    lien: string;
  }
}
