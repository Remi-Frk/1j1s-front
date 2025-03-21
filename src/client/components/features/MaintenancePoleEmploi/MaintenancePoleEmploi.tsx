import Image from 'next/image';
import React  from 'react';

import styles from '~/client/components/features/MaintenancePoleEmploi/MaintenancePoleEmploi.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';

export default function MaintenancePoleEmploi() {
  
  return (
    <section className={ styles.section }>
      <Container className={ styles.sectionContainer }>
        <aside className= { styles.sectionContainerIllustration }>
          <Image src="/illustrations/maintenance.svg" objectFit='cover' layout='fill' alt='' />
        </aside>
        <article className={ styles.sectionContainerText}>
          <h1 className={styles.sectionContainerTextTitre}>Le formulaire pour déposer une offre d&apos;emploi est actuellement en maintenance. Merci de réessayer plus tard.</h1>
          <p>Pour patienter, découvrez l&apos;ensemble des dispositifs du plan jeune pour les employeurs.</p>
          <LinkAsButton
            href="/mesures-employeurs"
          >
            Je découvre les dispositifs
          </LinkAsButton>
        </article>
      </Container>
    </section>
  );
}
