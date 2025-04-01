import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  AccordionContentText,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { examples } from "@/components/docs/examples/accordion";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";

const AccordionDemo = () => {
  const accRef = React.useRef(null);
  return (
    <ScrollView
      className={`bg-background-0 ${examples?.length > 0 ? "" : "web:justify-center"}`}
      contentContainerClassName="px-3 pb-6"
    >
      <Box className="p-5 rounded-lg m-3 mt-5 bg-background-50 gap-5 min-h-[200px] max-w-[600px] lg:min-w-[700px] w-full self-center">
        <Text className="border-b border-outline-200 pb-2 lg:pb-3 lg:text-xl text-base">
          Default
        </Text>

        <ScrollView contentContainerClassName="max-h-[500px] md:mx-10">
          <Accordion className="border border-outline-200 rounded-lg overflow-hidden">
            <AccordionItem value="a">
              <AccordionHeader>
                <AccordionTrigger>
                  {(states: any) => (
                    <>
                      <AccordionTitleText>
                        How do I place an order?
                      </AccordionTitleText>
                      {states.isExpanded ? (
                        <AccordionIcon as={ChevronUpIcon} />
                      ) : (
                        <AccordionIcon as={ChevronDownIcon} />
                      )}
                    </>
                  )}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent ref={accRef}>
                <AccordionContentText>
                  You can place your order by clicking the "Order Now" button.
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
            <Divider />
            <AccordionItem value="b">
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }: { isExpanded: boolean }) => {
                    return (
                      <>
                        <AccordionTitleText>
                          What payment methods do you accept?
                        </AccordionTitleText>
                        {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} />
                        ) : (
                          <AccordionIcon as={ChevronDownIcon} />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <AccordionContentText>
                  We accept Visa, Mastercard, and American Express.
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollView>
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

export default AccordionDemo;
