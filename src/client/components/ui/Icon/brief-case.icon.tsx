import classNames from 'classnames';

import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function BriefCaseIcon({ color = 'currentColor', className, isDecorative = true }: SvgProps) {
  return (
    <svg className={classNames(className)} width="52" height="52" viewBox="0 0 52 52" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden={isDecorative}>
      <path fillRule="evenodd" clipRule="evenodd" d="M34.6667 2.16663C35.8633 2.16663 36.8333 3.13668 36.8333 4.33329V10.8333H45.5C46.6966 10.8333 47.6667 11.8033 47.6667 13V43.3333C47.6667 44.5299 46.6966 45.5 45.5 45.5H6.50001C5.30339 45.5 4.33334 44.5299 4.33334 43.3333V13C4.33334 11.8033 5.30339 10.8333 6.50001 10.8333H15.1667V4.33329C15.1667 3.13668 16.1367 2.16663 17.3333 2.16663H34.6667ZM43.3333 34.6666H8.66668V41.1666H43.3333V34.6666ZM43.3333 15.1666H8.66668V30.3333H43.3333V15.1666ZM28.1667 23.8333V28.1666H23.8333V23.8333H28.1667ZM32.5 6.49996H19.5V10.8333H32.5V6.49996Z" />
    </svg>
  );
}
