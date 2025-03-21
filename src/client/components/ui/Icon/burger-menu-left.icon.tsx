import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function BurgerMenuLeftIcon({ color = 'currentColor', className, isDecorative = true }: SvgProps) {
  return (
    <svg width="16" height="16" className={classNames(className, styles.size)}  viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden={isDecorative}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 2.66675H14V4.00008H2V2.66675ZM2 7.33341H10V8.66675H2V7.33341ZM2 12.0001H14V13.3334H2V12.0001Z" />
    </svg>
  );
}
