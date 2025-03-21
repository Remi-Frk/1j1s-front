import React from 'react';

import styles from '~/client/components/features/Immersions/ReferencesEntreprises/RéférencerEntreprises.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';


export function RéférencerEntreprises () {
  return (
    <div className={styles.referencer}>
      <Container className={styles.container}>
        <h2 className={styles.referencerTitre}>Référencer votre entreprise afin de proposer des immersions au sein de votre entreprise</h2>
        <p>Proposer une immersion c’est permettre à des jeunes :</p>
        <ul>
          <li>De découvrir un métier</li>
          <li>De les aider à confirmer un projet professionnel en situation réelle de travail</li>
          <li>D’initier un parcours d’embauche pour leur permettre d’accéder à un emploi ou dans le cadre d’une reconversion</li>
        </ul>
        <div className={styles.referencerBouton}>
          <LinkAsButton href="/immersions/referencer-mon-entreprise">
            Référencer mon entreprise
          </LinkAsButton>
        </div>
      </Container>
    </div>

  );
}
