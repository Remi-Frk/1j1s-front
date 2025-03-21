import { useRouter } from 'next/router';
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles
  from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { InputMétierRecherché } from '~/client/components/ui/Form/InputMétierRecherché/InputMétierRecherché';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import {
  getFormAsQuery,
  getFormValue,
} from '~/client/utils/form.util';

export function FormulaireRechercheAlternance() {
  const rechercheAlternanceForm = useRef<HTMLFormElement>(null);

  const queryParams = useAlternanceQuery();
  const router = useRouter();

  const [inputIntituléMétier, setInputIntituléMétier] = useState<string>('');
  const [inputLibelleCommune, setInputLibelleCommune] = useState<string>('');
  const [inputLatitudeCommune, setInputLatitudeCommune] = useState<string>('');
  const [inputLongitudeCommune, setInputLongitudeCommune] = useState<string>('');
  const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
  const [inputCodeRome, setInputCodeRome] = useState<string>('');
  const [inputDistanceCommune, setInputDistanceCommune] = useState<string>('');

  const [inputIntituleMétierObligatoireErrorMessage, setInputIntituleMétierObligatoireErrorMessage] = useState<boolean>(false);

  useEffect(function initFormValues() {
    setInputIntituléMétier(queryParams.metierSelectionne || '');
    setInputCodeRome(queryParams.codeRomes || '');
    setInputLongitudeCommune(queryParams.longitudeCommune || '');
    setInputLatitudeCommune(queryParams.latitudeCommune || '');
    setInputCodeCommune(queryParams.codeCommune || '');
    setInputLibelleCommune(queryParams.libelleCommune || '');
    setInputDistanceCommune(queryParams.distanceCommune || '');
  }, [queryParams]);

  function resetHandleErrorMessageActive() {
    setInputIntituleMétierObligatoireErrorMessage(false);
  }

  async function updateRechercherAlternanceQueryParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const métierSéléctionné = getFormValue(event.currentTarget, 'metierSelectionne');
    const codeRomeList = getFormValue(event.currentTarget, 'codeRomes');
    if(!codeRomeList?.length || !métierSéléctionné) {
      return setInputIntituleMétierObligatoireErrorMessage(true);
    }
    const query = getFormAsQuery(event.currentTarget);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <form
      className={styles.rechercheAlternanceForm}
      onSubmit={updateRechercherAlternanceQueryParams}
      role="form"
      ref={rechercheAlternanceForm}
    >
      <InputMétierRecherché
        id="input-metier"
        libellé={inputIntituléMétier}
        code={inputCodeRome.length ? inputCodeRome.split(',') : []}
        handleErrorMessageActive={inputIntituleMétierObligatoireErrorMessage}
        resetHandleErrorMessageActive={resetHandleErrorMessageActive}
      />
      <InputCommune
        id="input-commune"
        code={inputCodeCommune}
        libellé={inputLibelleCommune}
        latitude={inputLatitudeCommune}
        longitude={inputLongitudeCommune}
        distance={inputDistanceCommune}
      />
      <div className={styles.buttonRechercher}>
        <ButtonComponent
          label='Rechercher'
          icon={<Icon name="magnifying-glass" />}
          iconPosition='right'
          type='submit'
        />
      </div>
    </form>
  );
}
