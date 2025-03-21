import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

export default function Handicap({ setTypeFormulaireAffiché, setIsInscriptionPôleEmploiModalOpen }: FormulairesProps ) {
  return <>
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('BesoinAide26ans')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Êtes-vous en situation de handicap (RQTH) ?</p>
    <div>
      <button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('AutresBesoins26ans')}>Oui</button>
      <button className={styles.optionBouton} onClick={() => setIsInscriptionPôleEmploiModalOpen(true)}>Non</button>
    </div>
  </>;
}
