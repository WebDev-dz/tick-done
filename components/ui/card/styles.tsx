import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';
const baseStyle = isWeb ? 'flex flex-col relative z-0' : '';

export const cardStyle = tva({
  base: baseStyle,
  variants: {
    size: {
      sm: 'p-3 rounded',
      md: 'p-4 rounded-md',
      lg: 'p-6 rounded-xl',
    },
    variant: {
      elevated: 'bg-background-0',
      outline: 'border border-outline-200 ',
      ghost: 'rounded-none',
      filled: 'bg-background-50',
    },
  },
});


export const cardHeaderStyle = tva({
  base: 'flex flex-col space-y-1.5 p-6',
});

export const cardContentStyle = tva({
  base: 'p-6 pt-0',
});

export const cardFooterStyle = tva({
  base: 'flex items-center p-6 pt-0',
});

export const cardTitleStyle = tva({
  base: 'font-semibold leading-none tracking-tight',
});

export const cardDescriptionStyle = tva({
  base: 'text-sm text-muted-foreground',
});