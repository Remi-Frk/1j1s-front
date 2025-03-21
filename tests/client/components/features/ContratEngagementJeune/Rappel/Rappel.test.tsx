/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';

import Rappel from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

describe('<Rappel />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  function renderComponent() {
    const onSuccess = jest.fn();
    const anDemandeDeContactService = (): DemandeDeContactService => ({
      envoyerPourLeCEJ: jest.fn().mockResolvedValue(createSuccess(undefined)),
      envoyerPourLesEntreprisesSEngagent: jest.fn().mockResolvedValue(createSuccess(undefined)),
    } as unknown as DemandeDeContactService);
    const demandeDeContactServiceMock = anDemandeDeContactService();
    const localisationService = aLocalisationService({
      communeList: [{ code: '75101', codePostal: '75001', libelle: 'Paris (75001)', nom: 'Paris' }],
      départementList: [],
      régionList: [],
    });

    render(
      <DependenciesProvider demandeDeContactService={demandeDeContactServiceMock} localisationService={localisationService}>
        <Rappel/>
      </DependenciesProvider>,
    );
    return { demandeDeContactServiceMock, onSuccess };
  }

  it('le composant s\'affiche correctement', () => {
    // Given
    // When
    renderComponent();
    // Then
    expect(screen.getByText('Je souhaite être contacté(e)')).toBeInTheDocument();
  });
  describe('Lorsqu\'on clique sur le bouton je souhaite être contacté(e)', () => {
    const labels = ['Prénom', 'Nom', 'Adresse email', 'Téléphone', 'Age', 'Ville'];
    it('affiche un formulaire de rappel', async () => {
      // Given
      renderComponent();
      // When
      await userEvent.click(screen.getByText('Je souhaite être contacté(e)'));
      // Then
      for (const label of labels) {
        expect(screen.getByLabelText(label)).toBeInTheDocument();
      }
      expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeInTheDocument();
    });
  });
});
