import classNames from 'classnames';
import React, {
  useEffect,
  useState,
} from 'react';

import FormulaireDeContactCEJ from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContactCEJ';
import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import Marked from '~/client/components/ui/Marked/Marked';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';


export default function Rappel() {
  const [isPopInOpen, setIsPopInOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isPopInOpen) setIsSuccess(false);
  }, [isPopInOpen]);

  function onFormulaireEnvoyé() {
    setIsSuccess(true);
  }

  return (
    <div className={classNames(styles.rappel, 'background-white-lilac')}>
      <Container className={styles.rappelContainer}>
        <Marked markdown={'## J\'ai des questions sur le Contrat d\'Engagement Jeune'}/>
        <Button
          onClick={() => setIsPopInOpen(true)}
          buttonType="withRightIcon"
          icon={<AngleRightIcon/>}>
          Je souhaite être contacté(e)
        </Button>
      </Container>
      <ModalComponent
        className={styles.rappelModal}
        isOpen={isPopInOpen}
        close={() => setIsPopInOpen(false)}
        aria-labelledby={ !isSuccess ? 'dialog_label' : 'dialog_label_success'}
      >
        { !isSuccess && <ModalComponent.Title className={styles.rappelTitle} id="dialog_label">
        J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé
        </ModalComponent.Title>
        }
        <ModalComponent.Content className={!isSuccess ? styles.rappelContent : styles.rappelContentSuccess}>
          { !isSuccess && <small>(Tous les champs sont obligatoires)</small> }
          <FormulaireDeContactCEJ onSuccess={() => onFormulaireEnvoyé() }>
            <Button onClick={ () => setIsPopInOpen(false)} buttonType="primary" title="Revenir à la page" className={styles.btnSuccess}>Fermer</Button>
          </FormulaireDeContactCEJ>
        </ModalComponent.Content>
      </ModalComponent>
    </div>
  );
}
