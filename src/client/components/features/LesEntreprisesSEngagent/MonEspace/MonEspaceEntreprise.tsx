import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';

import styles from './MonEspaceEntreprise.module.scss';

export default function MonEspaceEntreprise() {

  return (
    <section className={styles.monEspace}>
      <Container className={styles.container}>
        <h2 className={styles.monEspaceTitre}>Les entreprises s&apos;engagent auprès de la jeunesse !</h2>
        <div className={styles.monEspaceAccroche}>J&apos;accède à mon espace entreprise</div>
        <div className={styles.monEspaceDescription}>
          <strong>Vous avez déjà rejoint la mobilisation &quot;Les entreprises s&apos;engagent&quot; pour les jeunes ?</strong>
          <div>Pour accéder à tous les services qui vous aideront à réaliser et valoriser vos engagements pour la jeunesse, connectez-vous à votre
            espace sur la plateforme &quot;Les entreprises s&apos;engagent&quot;.
          </div>
        </div>
        <div className={styles.containerBoutons}>
          <LinkAsButton className={styles.monEspaceConnexion} href="https://www.lesentreprises-sengagent.gouv.fr/login">
            Je me connecte à mon espace
          </LinkAsButton>
          <LinkAsButton className={styles.monEspaceInscription} href={'/les-entreprises-s-engagent'}>
            <span className={styles.monEspaceInscriptionLien}><Icon
              name={'information'}/> Je ne suis pas encore inscrit, je rejoins la mobilisation</span>
          </LinkAsButton>
        </div>
      </Container>
    </section>
  );
}
