import React from "react";
import { Tooltip, TooltipContent, TooltipText } from "@/components/ui/tooltip";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Platform } from "react-native";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/tooltip";

const DirectionalTooltip = ({ placement, IconComponent }: any) => {
  const [pressed, setPressed] = React.useState(false);
  const tooltipProps = Platform.OS !== "web" ? { isOpen: pressed } : {};
  return (
    <Tooltip
      placement={placement}
      // isOpen={pressed}
      {...tooltipProps}
      trigger={(triggerProps) => (
        <Button
          variant="link"
          {...triggerProps}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          className="h-fit"
        >
          <ButtonIcon as={IconComponent} size="sm" />
        </Button>
      )}
    >
      <TooltipContent>
        <TooltipText>Hello World!</TooltipText>
      </TooltipContent>
    </Tooltip>
  );
};

const TooltipDemo = () => {
  return (
    <ScrollView
      className={`bg-background-0 ${examples?.length > 0 ? "" : "web:justify-center"}`}
      contentContainerClassName="px-3 pb-6"
    >
      <Box className="p-5 rounded-lg m-3 mt-5 bg-background-50 gap-5 min-h-[200px] max-w-[600px] lg:min-w-[700px] w-full self-center">
        <Text className="border-b border-outline-200 pb-2 lg:pb-3 lg:text-xl text-base">
          Default
        </Text>
        <Center className="flex-1">
          <Center className="h-[175px] w-[175px] rounded-lg border border-outline-200 shadow-hard-5 p-2 flex flex-row items-center justify-center gap-3">
            <DirectionalTooltip
              placement="left"
              IconComponent={ChevronLeftIcon}
            />

            <VStack className="items-center justify-center gap-3 h-full">
              <DirectionalTooltip
                placement="top"
                IconComponent={ChevronUpIcon}
              />

              <Box className="bg-background-50 rounded-md p-2 items-center justify-center w-[90px] aspect-[1/1]">
                <Text size="xs" className="text-center">
                  Hover over the arrows
                </Text>
              </Box>

              <DirectionalTooltip
                placement="bottom"
                IconComponent={ChevronDownIcon}
              />
            </VStack>

            <DirectionalTooltip
              placement="right"
              IconComponent={ChevronRightIcon}
            />
          </Center>
        </Center>
      </Box>

      {examples?.length > 0 &&
        examples.map((Example: any, index: any) => {
          const isFunctionComponent = typeof Example.Code === "function"; // Check if Code is a function
          return (
            <Box
              key={index}
              className="p-5 border border-outline-100 rounded-lg my-2.5 gap-5 min-h-[200px] max-w-[600px] lg:min-w-[700px] w-full self-center"
            >
              <Text className="border-b border-outline-200 pb-2 lg:pb-3 lg:text-xl text-base">
                {Example.name}
              </Text>
              <Center className="flex-1">
                {isFunctionComponent ? <Example.Code /> : Example.Code}
              </Center>
            </Box>
          );
        })}
    </ScrollView>
  );
};

export default TooltipDemo;
