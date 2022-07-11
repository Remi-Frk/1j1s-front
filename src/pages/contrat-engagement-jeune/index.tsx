import { Icon } from '@dataesr/react-dsfr';
import Image from 'next/image';
import React from 'react';

import useBreakpoint from '~/client/hooks/useBreakpoint';
import heroStyles from '~/pages/contrat-engagement-jeune/Hero.module.scss';


export default function ContratEngagementJeune() {
  return (
    <Hero />
  );
}

function Hero() {
  const { isLargeScreen, isXLargeScreen } = useBreakpoint();
  const displayImage = isLargeScreen || isXLargeScreen;
  const image = '/images/banners/CEJ_banner_hero.jpg';
  const titre = 'Je découvre le Contrat d\'Engagement Jeune';
  const accroche = 'Finie la galère, trouvez un métier qui va vous plaire.';
  const styles = heroStyles;
  const styleTitre = {
    color: 'white',
  };
  const styleAccroche = {
    fontSize: '16px', fontWeight: '700', 
  };

  const children = (
    <>
      <h1 style={ styleTitre } >{ titre }</h1>
      { !displayImage && (<p style={ styleAccroche }>{ accroche }</p>) }
      <a href="#" className={ styles.cta }>Je me lance &nbsp;<Icon name="ri-arrow-right-s-line" /></a>
    </>
  );

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroTitle}>
          {children}
        </span>
      </div>
      {displayImage && (
        <div className={styles.heroImage}>
          <Image src={image} alt={ accroche } layout="fill" objectFit="contain" objectPosition="right"/>
        </div>
      )}
    </div>
  );
}
