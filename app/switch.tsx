import React from "react";
import colors from "tailwindcss/colors";
import { Switch } from "@/components/ui/switch";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/switch";
import { Box } from "@/components/ui/box";

const SwitchDemo = () => {
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
          <HStack
            className="bg-background-0 px-10 py-5 rounded-full border border-outline-100 shadow-hard-5 items-center justify-center"
            space="xl"
          >
            <Text size="lg">Enable Notification</Text>
            <Switch
              size="lg"
              trackColor={{
                false: colors.neutral[300],
                true: colors.neutral[600],
              }}
              thumbColor={colors.neutral[50]}
              // @ts-ignore
              activeThumbColor={colors.neutral[50]}
              ios_backgroundColor={colors.neutral[300]}
            />
          </HStack>
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

export default SwitchDemo;
