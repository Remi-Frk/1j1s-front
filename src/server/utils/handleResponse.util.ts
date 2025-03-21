import { NextApiResponse } from 'next';

import { Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

export function handleResponse<R>(résultats: Either<R>, res: NextApiResponse<R | ErrorHttpResponse>) {
  switch (résultats.instance) {
    case 'success':
      return res.status(200).json(résultats.result);
    case 'failure':
      switch(résultats.errorType) {
        case ErreurMétier.SERVICE_INDISPONIBLE:
          return res.status(503).json({ error: résultats.errorType });
        case ErreurMétier.DEMANDE_INCORRECTE:
          return res.status(400).json({ error: résultats.errorType });
        case ErreurMétier.CONTENU_INDISPONIBLE:
          return res.status(404).json({ error: résultats.errorType });
      }
  }
}
