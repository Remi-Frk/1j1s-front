import classNames from 'classnames';

import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function CompassIcon({ color = 'currentColor', className, isDecorative = true }: SvgProps) {
  return (
    <svg className={classNames(className)} width="52" height="52" viewBox="0 0 52 52" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden={isDecorative}>
      <path fillRule="evenodd" clipRule="evenodd" d="M26 4.33325C37.9665 4.33325 47.6667 14.0334 47.6667 25.9999C47.6667 37.9664 37.9665 47.6666 26 47.6666C14.0335 47.6666 4.33334 37.9664 4.33334 25.9999C4.33334 14.0334 14.0335 4.33325 26 4.33325ZM26 8.66659C16.4271 8.66659 8.66668 16.427 8.66668 25.9999C8.66668 35.5729 16.4271 43.3333 26 43.3333C35.5729 43.3333 43.3333 35.5729 43.3333 25.9999C43.3333 16.427 35.5729 8.66659 26 8.66659ZM35.75 16.2499L30.3333 30.3333L16.25 35.7499L21.6667 21.6666L35.75 16.2499ZM26 23.8333C24.8034 23.8333 23.8333 24.8033 23.8333 25.9999C23.8333 27.1965 24.8034 28.1666 26 28.1666C27.1966 28.1666 28.1667 27.1965 28.1667 25.9999C28.1667 24.8033 27.1966 23.8333 26 23.8333Z" />
    </svg>
  );
}
