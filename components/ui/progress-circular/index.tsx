// CircularProgressComponents.tsx
import React, { createContext, useContext } from 'react';
import { 
  Box, 
  VStack, 
  Text,
  
} from '../';
import Svg, { Circle } from 'react-native-svg';
import { tva } from '@gluestack-ui/nativewind-utils';

// Create context to share props between components
type CircularProgressContextType = {
  value: number;
  max: number;
  size: 'sm' | 'md' | 'lg' | 'xl';
  thickness: number;
  color: string;
  trackColor: string;
};

const CircularProgressContext = createContext<CircularProgressContextType>({
  value: 0,
  max: 100,
  size: 'md',
  thickness: 10,
  color: '$primary500',
  trackColor: '$backgroundLight300',
});

// Size mappings
const sizeMap = {
  'sm': 60,
  'md': 80,
  'lg': 100,
  'xl': 120,
};

const thicknessMap = {
  'sm': 6,
  'md': 8,
  'lg': 10,
  'xl': 12,
};

// CircularProgress component
type CircularProgressProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  thickness?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
};


const circularProgressStyle = tva({
  base: 'relative flex items-center justify-center',
  variants: {
    size: {
      sm: 'w-15 h-15',
      md: 'w-16 h-16',
      lg: 'w-20 h-20',
      xl: 'w-24 h-24',
    },
  },
});

export const CircularProgress = ({
  value,
  max = 100,
  size = 'md',
  thickness,
  color = '$primary500',
  trackColor = '$backgroundLight200',
  children,
  ...rest
}: CircularProgressProps) => {
  // Ensure value is between 0 and max
  const clampedValue = Math.max(0, Math.min(value, max));
  
  // Use predefined thickness if not specified
  const strokeWidth = thickness || thicknessMap[size];
  
  return (
    <CircularProgressContext.Provider
      value={{
        value: clampedValue,
        max,
        size,
        thickness: strokeWidth,
        color,
        trackColor,
      }}
    >
      <Box 
        {...rest}
        className={circularProgressStyle({ size })}
      >
        {children}
      </Box>
    </CircularProgressContext.Provider>
  );
};

// CircularProgressFilledTrack component
export const CircularProgressFilledTrack = () => {
  const {
    value,
    max,
    size,
    thickness,
    color,
    trackColor,
  } = useContext(CircularProgressContext);
  
  // Calculate dimensions
  const circleSize = sizeMap[size];
  const radius = (circleSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;
  
  return (
    <Svg width={circleSize} height={circleSize} style={{ transform: [{ rotate: '-90deg' }] }}>
      {/* Background track */}
      <Circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        strokeWidth={thickness}
        stroke={trackColor}
        fill="transparent"
      />
      
      {/* Progress arc */}
      <Circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        strokeWidth={thickness}
        stroke={color}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
};

// CircularProgressLabel component
export const CircularProgressLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box

      className='absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center'
    >
      {children}
    </Box>
  );
};

// Example usage:
export const CircularProgressExample = () => (
  <VStack className='items-center' space="md">
    <CircularProgress value={75} size="lg">
      <CircularProgressFilledTrack />
      <CircularProgressLabel>
        <Text className="text-md font-bold">75%</Text>
      </CircularProgressLabel>
    </CircularProgress>
    
    <CircularProgress value={40} size="md" color="$error500">
      <CircularProgressFilledTrack />
      <CircularProgressLabel>
        <Text className="text-bold">40%</Text>
      </CircularProgressLabel>
    </CircularProgress>
  </VStack>
);