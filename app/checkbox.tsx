import React, { useState } from "react";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { examples } from "@/components/docs/examples/checkbox";
import { ScrollView } from "@/components/ui/scroll-view";

const initialTodoList = [
  { id: 1, label: "Feed Tommy", isDone: false },
  { id: 2, label: "Buy milk and eggs", isDone: false },
  { id: 3, label: "Yoga with matty", isDone: false },
];

const CheckboxDemo = () => {
  const [todoList, setTodoList] = useState(initialTodoList);

  const handleCheckboxChange = (id: number) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
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
          <Box className="flex flex-col gap-4">
            <Text size="xl" className="font-semibold text-typography-900">
              To-do List
            </Text>

            {todoList.map((todo) => (
              <Checkbox
                key={todo.id}
                value={todo.id.toString()}
                isChecked={todo.isDone}
                onChange={() => handleCheckboxChange(todo.id)}
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel
                  className={`${todo.isDone ? "line-through" : ""}`}
                >
                  {todo.label}
                </CheckboxLabel>
              </Checkbox>
            ))}
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

export default CheckboxDemo;
