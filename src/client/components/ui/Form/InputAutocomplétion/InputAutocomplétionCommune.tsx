import React, { SyntheticEvent, useCallback } from 'react';

import InputAutocomplétion from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétion';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation.service';
import { CommuneLocalisationApiResponse } from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

interface AutocomplétionCommuneProps {
  onSuggestionSelected?(event: SyntheticEvent, suggestion: CommuneLocalisationApiResponse, suggestionValue: string, suggestionIndex: number, sectionIndex: number | null, method: string): void;

  id?: string;
  valeurInitiale ?: CommuneLocalisationApiResponse
  label?: string;
  debounce?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export default function InputAutocomplétionCommune(props: AutocomplétionCommuneProps) {
  const { onSuggestionSelected, valeurInitiale, ...rest } = props;
  const localisationService = useDependency<LocalisationService>('localisationService');

  const suggestionsAdresse = useCallback(async (préfixe: string) => {
    const résultat = await localisationService.rechercherLocalisation(préfixe);
    return résultat ? résultat.communeList : [];
  }, [localisationService]);

  function afficherSuggestion(suggestion: CommuneLocalisationApiResponse) {
    return suggestion.libelle;
  }

  function valeurSuggestion(suggestion: CommuneLocalisationApiResponse) {
    return suggestion.libelle;
  }

  return <InputAutocomplétion
    suggérer={suggestionsAdresse}
    afficher={afficherSuggestion}
    valeur={valeurSuggestion}
    onSuggestionSelected={onSuggestionSelected}
    valeurInitiale={valeurInitiale?.libelle}
    {...rest}
  />;
}
