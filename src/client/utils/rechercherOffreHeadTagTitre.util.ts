import { ErreurMétier } from '~/server/errors/erreurMétier.types';


const SERVICE_INDISPONIBLE_TITLE = '- Service indisponible';
const DEMANDE_INCORRECTE_TITLE = '- Demande incorrecte';

export function getRechercherOffreHeadTagTitre(prefixTitle: string, errorType?: ErreurMétier): string {
  let title = '';
  switch (errorType) {
    case ErreurMétier.SERVICE_INDISPONIBLE: {
      title = SERVICE_INDISPONIBLE_TITLE;
      break;
    }
    case ErreurMétier.DEMANDE_INCORRECTE: {
      title = DEMANDE_INCORRECTE_TITLE;
      break;
    }
  }
  return `${prefixTitle} ${title} | 1jeune1solution`;
}
