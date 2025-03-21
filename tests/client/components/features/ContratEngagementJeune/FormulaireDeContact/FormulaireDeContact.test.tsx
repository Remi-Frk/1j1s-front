/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';

import FormulaireDeContactCEJ from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContactCEJ';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

jest.setTimeout(10000);
describe('<FormulaireDeContactCEJ />', () => {
  const labels = ['Prénom', 'Nom', 'Adresse email', 'Téléphone', 'Age', 'Ville'];

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
        <FormulaireDeContactCEJ onSuccess={onSuccess}>
          Revenir
        </FormulaireDeContactCEJ>
      </DependenciesProvider>,
    );
    return { demandeDeContactServiceMock, onSuccess };
  }

  it('affiche un formulaire de rappel', async () => {
    // Given
    renderComponent();
    // When
    // Then
    for (const label of labels) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }

    expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeInTheDocument();
  });

  for (const label of labels.filter((l) => l !== 'Age')) {
    it(`a un champ ${label} obligatoire`, async () => {
      // Given
      renderComponent();
      // When
      await userEvent.type(screen.getByLabelText(label), 's{backspace}');
      // Then
      expect(screen.getByLabelText('Nom')).toBeInvalid();
    });
  }

  it('a un champ Age obligatoire', async () => {
    // Given
    renderComponent();
    // When
    await userEvent.click(screen.getByLabelText('Age'));
    await userEvent.click(screen.getByLabelText('Nom'));
    // When
    const input = await screen.findByTestId('Select-InputHidden');

    // Then
    expect(input).toBeInvalid();
  });
  describe('Quand l’utilisateur clique sur Envoyer la demande', () => {
    describe('et que le formulaire est valide', () => {
      it('appelle l’api avec les paramètres saisis dans le formulaire', async () => {
        // Given
        const { demandeDeContactServiceMock } = renderComponent();

        // When
        await remplirFormulaireDeContact({
          age: '19 ans',
          email: 'toto@msn.fr',
          nom: 'Mc Totface',
          prénom: 'Toto',
          téléphone: '0123456789',
          ville: 'Paris',
        });

        // Then
        expect(demandeDeContactServiceMock.envoyerPourLeCEJ).toHaveBeenCalledWith({
          age: 19,
          email: 'toto@msn.fr',
          nom: 'Mc Totface',
          prénom: 'Toto',
          téléphone: '0123456789',
          ville: 'Paris (75001)',
        });
      });
      it('appelle la propriété onSuccess', async () => {
        // Given
        const { onSuccess } = renderComponent();

        // When
        await remplirFormulaireDeContact({
          age: '19 ans',
          email: 'toto@msn.fr',
          nom: 'Mc Totface',
          prénom: 'Toto',
          téléphone: '0123456789',
          ville: 'Pontoise',
        });

        // Then
        expect(onSuccess).toHaveBeenCalled();
      });
      it('Affiche un message de confirmation et {children}', async () => {
        // Given
        renderComponent();

        // When
        await remplirFormulaireDeContact({
          age: '19 ans',
          email: 'toto@msn.fr',
          nom: 'Mc Totface',
          prénom: 'Toto',
          téléphone: '0123456789',
          ville: 'Paris',
        });

        // Then
        expect(screen.getByText('Votre demande a bien été transmise !')).toBeInTheDocument();
        expect(screen.getByText('Revenir')).toBeInTheDocument();
      });
    });
  });
  describe('quand on clique sur politique de confidentialité', () => {
    it('ça te renvoie vers la page confidentialite', () => {
      // Given
      const politiqueConfidentialité = 'politique de confidentialité';

      renderComponent();

      // Then
      const link = screen.getByRole('link', { name: politiqueConfidentialité });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining('/confidentialite'));
    });
  });
  describe('quand on clique sur CGU', () => {
    it('ça te renvoie vers la page cgu', () => {
      // Given
      const cgu = 'CGU';

      renderComponent();

      // Then
      const link = screen.getByRole('link', { name: cgu });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining('/cgu'));
    });
  });
});

/* eslint-disable jest/no-export */
type ContactInputs = Record<'prénom' | 'nom' | 'téléphone' | 'email' | 'age' | 'ville', string>

export async function remplirFormulaireDeContact(data: ContactInputs, user = userEvent.setup(), submit = true) {
  await user.type(screen.getByLabelText('Prénom'), data.prénom);
  await user.type(screen.getByLabelText('Nom'), data.nom);
  await user.type(screen.getByLabelText('Téléphone'), data.téléphone);
  await user.type(screen.getByLabelText('Adresse email'), data.email);

  await userEvent.type(screen.getByLabelText('Ville'), data.ville);
  // eslint-disable-next-line testing-library/no-wait-for-side-effects
  await waitFor(() => userEvent.click(screen.getByText('Paris (75001)')));

  await user.click(screen.getByLabelText('Age'));
  await user.click(screen.getByLabelText(data.age));
  if (submit) {
    await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));
  }
}

