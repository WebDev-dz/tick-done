import React from "react";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { CircleIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/radio";

const RadioDemo = () => {
  const [values, setValues] = React.useState("");

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
          <Box className="p-6 rounded-lg border border-outline-200 shadow-hard-5">
            <Text size="xl" className="font-semibold text-typography-900">
              Do you like gluestack?
            </Text>
            <RadioGroup
              value={values}
              onChange={setValues}
              className="mt-6 ml-1"
            >
              <VStack space="lg">
                <Radio value="optionA">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Yes</RadioLabel>
                </Radio>

                <Radio value="optionB">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Also, yes</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>
          </Box>
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

export default RadioDemo;
