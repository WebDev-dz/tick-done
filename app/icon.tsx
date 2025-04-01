import React from "react";
import { Icon } from "@/components/ui/icon";
import { Center } from "@/components/ui/center";
import { Grid, GridItem } from "@/components/ui/grid";
import {
  ArrowDownCircle,
  BookmarkPlus,
  Delete,
  MessageSquare,
  Camera,
} from "lucide-react-native";
import {
  TrashIcon,
  CalendarDaysIcon,
  RepeatIcon,
  CopyIcon,
} from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/icon";
import { Text } from "@/components/ui/text";

const icons = [
  {
    id: 1,
    icon: CopyIcon,
  },
  {
    id: 2,
    icon: TrashIcon,
  },
  {
    id: 3,
    icon: CalendarDaysIcon,
  },
  {
    id: 4,
    icon: ArrowDownCircle,
  },
  {
    id: 5,
    icon: BookmarkPlus,
  },
  {
    id: 6,
    icon: Camera,
  },
  {
    id: 7,
    icon: RepeatIcon,
  },
  {
    id: 8,
    icon: Delete,
  },
  {
    id: 9,
    icon: MessageSquare,
  },
];

const IconDemo = () => {
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
          <Grid
            className="gap-10 w-full max-w-[216px] p-8 rounded-lg shadow-hard-5 border-outline-200 border"
            _extra={{
              className: "grid-cols-3",
            }}
          >
            {icons.map((icon) => {
              return (
                <GridItem
                  key={icon.id}
                  _extra={{
                    className: "col-span-1",
                  }}
                >
                  <Box className="flex items-center">
                    <Icon as={icon.icon} size="xl" />
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
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
export default IconDemo;
