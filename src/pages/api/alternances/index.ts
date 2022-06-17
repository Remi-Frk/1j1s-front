import { NextApiRequest, NextApiResponse } from 'next';

import { AlternanceFiltre, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheAlternance | ErrorHttpResponse>) {
  const résultatsRechercheAlternance = await dependencies.alternanceDependencies.rechercherAlternance
    .handle(alternanceRequestMapper(req));
  return res.status(200).json(résultatsRechercheAlternance);
}

export default monitoringHandler(rechercherAlternanceHandler);

function alternanceRequestMapper(request: NextApiRequest): AlternanceFiltre {
  const { query } = request;

  return {
    codeInsee: query.codeInsee ? CodeInsee.createCodeInsee(query.codeInsee.toString()): undefined,
    codeRomeList: query.codeRomes.toString().split(','),
  };
}
