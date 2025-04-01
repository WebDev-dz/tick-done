import React from 'react';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { View, ViewProps } from 'react-native';
import { cardContentStyle, cardDescriptionStyle, cardFooterStyle, cardHeaderStyle, cardStyle, cardTitleStyle } from './styles';

type ICardProps = ViewProps &
  VariantProps<typeof cardStyle> & { className?: string };

const Card = React.forwardRef<React.ElementRef<typeof View>, ICardProps>(
  ({ className, size = 'md', variant = 'elevated', ...props }, ref) => {
    return (
      <View
        className={cardStyle({ size, variant, class: className })}
        {...props}
        ref={ref}
      />
    );
  }
);

Card.displayName = 'Card';
const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  ICardProps
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cardHeaderStyle({ class: className })}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  ICardProps
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cardTitleStyle({ class: className })}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  ICardProps
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cardDescriptionStyle({ class: className })}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ICardProps
  >(({ className, ...props }, ref) => (
  <View ref={ref} className={cardContentStyle({ class: className })} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  ICardProps
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cardFooterStyle({ class: className })}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter };
