import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleRightFromLineIcon({ color = 'currentColor', className, isDecorative = true }: SvgProps) {
  return (
    <svg width="16" height="16" className={classNames(className, styles.size)}  viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden={isDecorative}>
      <path d="M10.6652 4.01465H11.9985V12.5013H10.6652V4.01465Z" fill={color}/>
      <path d="M4.14648 11.5573L7.44648 8.25732L4.14648 4.95732L5.08915 4.01465L9.33182 8.25732L5.08915 12.5L4.14648 11.5573Z" />
    </svg>
  );
}
