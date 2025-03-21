import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleDownIcon({ color = 'currentColor', className, isDecorative = true }: SvgProps) {
  return (
    <svg width="24" height="24" className={classNames(className, styles.size)} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden={isDecorative}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 13.5797L16.95 8.62971L18.364 10.0437L12 16.4077L5.63599 10.0437L7.04999 8.62971L12 13.5797Z" />
    </svg>
  );
}
