/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RefObject } from 'react';

import Bouée from '~/client/components/ui/Bouée/Bouée';

describe('<Bouée />', () => {
  const label = 'Remonter en haut de la page';
  afterEach(() => jest.resetAllMocks());
  beforeEach(() => {
    window.scrollTo = function () {
      this.dispatchEvent(new Event('scroll'));
    };
  });

  const DEBOUNCE_DELAY = 50;

  function mockSurface (initialY=20): [RefObject<HTMLElement>, (y: number) => void] {
    let y = initialY;
    const surface = {
      getBoundingClientRect: jest.fn(() => ({ y } as DOMRect)),
      scrollTo: jest.fn(),
    };
    const surfaceRef: RefObject<HTMLElement> = { current: surface as unknown as HTMLElement };
    const setY = (n: number) => { y=n; };
    return [surfaceRef, setY];
  }

  describe('quand l\'élément étalon est visible', () => {
    it('affiche un bouton qui reste invisible', () => {
      // Given
      const [surfaceRef] = mockSurface();
      // When
      render(<Bouée surface={ surfaceRef }/>);
      // Then
      const button = screen.getByRole('button', { description: label, hidden: true });
      expect(button).not.toBeVisible();
    });
    describe('mais qu\'on scroll vers le bas', () => {
      it('affiche le bouton', async () => {
        // Given
        const [surfaceRef, setY] = mockSurface();
        // When
        render(<Bouée surface={ surfaceRef }/>);
        setY(-100);
        await act(async () => {
          window.scrollTo({ top: 200 });
          await delay(DEBOUNCE_DELAY);
        });
        // Then
        const button = screen.getByRole('button', { description: label, hidden: false });
        expect(button).toBeVisible();
      });
      describe('et qu\'on clique sur le bouton', () => {
        it('scrolle jusqu\'à l\'élément étalon', async () => {
          // Given
          const [surfaceRef, setY] = mockSurface();
          // When
          render(<Bouée surface={ surfaceRef }/>);
          setY(-100);
          await act(async () => {
            window.scrollTo({ top: 200 });
            await delay(DEBOUNCE_DELAY);
          });
          const button = screen.getByRole('button', { description: label });
          await userEvent.click(button);
          // Then
          expect(window.scrollY).toEqual(0);
          // TODO : trouver une meilleure façon de faire
          // expect(window.scrollTo()).toHaveBeenCalled();
        });
      });
    });
  });
  describe('quand l\'élement étalon n\'est plus visible', () => {
    it('affiche un bouton visible', async () => {
      // Given
      const [surfaceRef] = mockSurface(-100);
      // When
      render(<Bouée surface={ surfaceRef }/>);
      await act(() => delay(DEBOUNCE_DELAY));
      // Then
      const button = screen.getByRole('button', { description: label, hidden: false });
      expect(button).toBeVisible();
    });
  });
});


function delay (ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
