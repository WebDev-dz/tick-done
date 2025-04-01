// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Divider,
  Progress,
  Button,
  ButtonText,
  Icon,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CircularProgress,
  CircularProgressFilledTrack,
  CircularProgressLabel,
  useToast,
  Toast,
  ToastTitle,
  Pressable,
  Spinner,
} from "@/components/ui";
import {
  LucideCalendarCheck,
  LucideList,
  LucideCheck,
  LucideTrendingUp,
  LucideBell,
} from "lucide-react-native";
import {
  Category,
  Habit,
  PrismaClient,
  Todo,
} from "@prisma/client/react-native";
import { format, isToday, startOfWeek, endOfWeek, parseISO } from "date-fns";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/components/ui/utils";

// Initialize Prisma client
const prisma = new PrismaClient();

type DashboardData = {
  habits: (Habit & {category: Category | null, logs: any[]})[];
  todos: (Todo & { category: Category | null })[];
  categories: Category[];
  stats: {
    todayHabitsCompleted: number;
    todayHabitsTotal: number;
    weeklyHabitsCompleted: number;
    weeklyHabitsTotal: number;
    pendingTodos: number;
    completedTodos: number;
  };
};

const Dashboard = ({ navigation }: { navigation: any }) => {
  const toast = useToast();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    habits: [],
    todos: [],
    categories: [],
    stats: {
      todayHabitsCompleted: 0,
      todayHabitsTotal: 0,
      weeklyHabitsCompleted: 0,
      weeklyHabitsTotal: 0,
      pendingTodos: 0,
      completedTodos: 0,
    },
  });

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch user's habits with recent logs
      const habits = await prisma.habit.findMany({
        where: { userId: user?.id },
        include: {
          logs: {
            orderBy: { date: "desc" },
            take: 7,
          },
          category: true,
        },
      });

      // Fetch user's todos
      const todos = await prisma.todo.findMany({
        where: {
          userId: user?.id,
          isCompleted: false,
          dueDate: {
            gte: new Date(),
          },
        },
        orderBy: { dueDate: "asc" },
        take: 5,
        include: { category: true },
      });

      // Fetch categories
      const categories = await prisma.category.findMany({
        where: { userId: user?.id },
      });

      // Calculate statistics
      const today = new Date();
      const startOfCurrentWeek = startOfWeek(today);
      const endOfCurrentWeek = endOfWeek(today);

      // Today's habits
      const todayHabits = habits.filter(
        (habit) =>
          habit.frequency === "DAILY" ||
          (habit.frequency === "WEEKLY" && today.getDay() === 0) ||
          (habit.frequency === "MONTHLY" && today.getDate() === 1)
      );

      const todayHabitsCompleted = todayHabits.filter((habit) =>
        habit.logs.some(
          (log) => isToday(parseISO(log.date.toString())) && log.isCompleted
        )
      ).length;

      // Weekly habits progress
      const weeklyHabitsTotal = habits.length * 7; // Simplified calculation
      const weeklyHabitsCompleted = habits.reduce((total, habit) => {
        return total + habit.logs.filter((log) => log.isCompleted).length;
      }, 0);

      // Todo counts
      const completedTodos = await prisma.todo.count({
        where: {
          userId: user?.id,
          isCompleted: true,
        },
      });

      // Set dashboard data
      setDashboardData({
        habits,
        todos,
        categories,
        stats: {
          todayHabitsCompleted,
          todayHabitsTotal: todayHabits.length,
          weeklyHabitsCompleted,
          weeklyHabitsTotal,
          pendingTodos: todos.length,
          completedTodos,
        },
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.show({
        render: () => (
          <Toast action="error">
            <ToastTitle>Error loading dashboard data</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const markHabitComplete = async (habitId: string) => {
    try {
      await prisma.habitLog.create({
        data: {
          habitId,
          date: new Date(),
          isCompleted: true,
        },
      });

      fetchDashboardData();
      toast.show({
        render: () => (
          <Toast action="success">
            <ToastTitle>Habit marked as complete</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      console.error("Error updating habit:", error);
      toast.show({
        render: () => (
          <Toast action="error">
            <ToastTitle>Error updating habit</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const markTodoComplete = async (todoId: string) => {
    try {
      await prisma.todo.update({
        where: { id: todoId },
        data: { isCompleted: true },
      });

      await prisma.todoLog.create({
        data: {
          todoId,
          date: new Date(),
          isCompleted: true,
        },
      });

      fetchDashboardData();
      toast.show({
        render: () => (
          <Toast action="success">
            <ToastTitle>Task completed!</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.show({
        render: () => (
          <Toast action="error">
            <ToastTitle>Error updating task</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  if (isLoading) {
    return (
      <Box className="flex-1 items-center justify-center">
        <Spinner size="large" />
        <Text className="mt-4">Loading your dashboard...</Text>
      </Box>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box className="p-4 bg-background-0 flex-1">
        {/* Header */}
        <HStack className="justify-between items-center mb-4">
          <VStack>
            <Heading size="xl">Dashboard</Heading>
            <Text className="text-sm text-gray-500">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </Text>
          </VStack>
          <Pressable onPress={() => navigation.navigate("Notifications")}>
            <Box className="bg-primary-100 p-3 rounded-full dark:bg-primary-100">
              <Icon as={LucideBell} size="md" color="$primary500" />
            </Box>
          </Pressable>
        </HStack>

        {/* Progress Summary */}
        <Card className="mb-4 p-4 rounded-lg">
          <CardHeader className="px-0">
            <Heading size="md">Today's Progress</Heading>
          </CardHeader>
          <CardContent className="px-0">
            <HStack className="space-x-4 justify-between mt-2">
              <VStack className="flex-1 items-center">
                <CircularProgress
                  value={
                    dashboardData.stats.todayHabitsTotal === 0
                      ? 0
                      : (dashboardData.stats.todayHabitsCompleted /
                          dashboardData.stats.todayHabitsTotal) *
                        100
                  }
                  size="lg"
                >
                  <CircularProgressFilledTrack />
                  <CircularProgressLabel>
                    <Text>
                      {dashboardData.stats.todayHabitsCompleted}/
                      {dashboardData.stats.todayHabitsTotal}
                    </Text>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text className="mt-2 font-medium">Daily Habits</Text>
              </VStack>

              <VStack className="flex-1 items-center">
                <CircularProgress
                  value={
                    dashboardData.stats.weeklyHabitsTotal === 0
                      ? 0
                      : (dashboardData.stats.weeklyHabitsCompleted /
                          dashboardData.stats.weeklyHabitsTotal) *
                        100
                  }
                  size="lg"
                >
                  <CircularProgressFilledTrack />
                  <CircularProgressLabel>
                    <Text>
                      {Math.round(
                        (dashboardData.stats.weeklyHabitsCompleted /
                          dashboardData.stats.weeklyHabitsTotal) *
                          100
                      )}
                      %
                    </Text>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text className="mt-2 font-medium">Weekly Progress</Text>
              </VStack>

              <VStack className="flex-1 items-center">
                <CircularProgress
                  value={
                    dashboardData.stats.pendingTodos +
                      dashboardData.stats.completedTodos ===
                    0
                      ? 0
                      : (dashboardData.stats.completedTodos /
                          (dashboardData.stats.pendingTodos +
                            dashboardData.stats.completedTodos)) *
                        100
                  }
                  size="lg"
                >
                  <CircularProgressFilledTrack />
                  <CircularProgressLabel>
                    <Text>{dashboardData.stats.completedTodos}</Text>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text className="mt-2 font-medium">Tasks Done</Text>
              </VStack>
            </HStack>
          </CardContent>
        </Card>

        {/* Habits Section */}
        <Card className="mb-4 p-4 rounded-lg">
          <CardHeader className="px-0">
            <HStack className="justify-between items-center w-full">
              <Heading size="md">Today's Habits</Heading>
              <Button
                variant="link"
                onPress={() => navigation.navigate("Habits")}
              >
                <ButtonText>View All</ButtonText>
              </Button>
            </HStack>
          </CardHeader>
          <CardContent className="px-0">
            {dashboardData.habits.length === 0 ? (
              <Box className="py-4 items-center">
                <Text>No habits found. Create your first habit!</Text>
                <Button
                  className="mt-2"
                  variant="solid"
                  onPress={() => navigation.navigate("CreateHabit")}
                >
                  <ButtonText>Create Habit</ButtonText>
                </Button>
              </Box>
            ) : (
              <VStack space="md">
                {dashboardData.habits
                  .filter(
                    (habit) =>
                      habit.frequency === "DAILY" ||
                      (habit.frequency === "WEEKLY" &&
                        new Date().getDay() === 0) ||
                      (habit.frequency === "MONTHLY" &&
                        new Date().getDate() === 1)
                  )
                  .slice(0, 3)
                  .map((habit) => {
                    const isCompleted = habit.logs.some(
                      (log) =>
                        isToday(parseISO(log.date.toString())) &&
                        log.isCompleted
                    );
                    return (
                      <HStack
                        key={habit?.id}
                        className={cn(
                          "justify-between items-center bg-background-100 p-3 rounded-md dark:bg-background-100",
                          isCompleted
                            ? "bg-success-50"
                            : "bg-background-100"
                        )}
                      >
                        <HStack space="md" className="items-center flex-1">
                          <Box
                            className={cn("p-2 rounded-md", habit.category?.colorCode || "bg-primary-100" )}
                          >
                            <Icon
                              as={LucideCalendarCheck}
                              size="sm"
                              color={
                                habit.category?.colorCode
                                  ? "$white"
                                  : "$primary500"
                              }
                            />
                          </Box>
                          <VStack>
                            <Text className="font-medium">{habit.name}</Text>
                            <Text size="xs" className="text-light-500">
                              {habit.frequency.charAt(0) +
                                habit.frequency.slice(1).toLowerCase()}
                            </Text>
                          </VStack>
                        </HStack>

                        <Button
                          size="sm"
                          variant={isCompleted ? "outline" : "solid"}
                          isDisabled={isCompleted}
                          onPress={() => markHabitComplete(habit.id)}
                        >
                          <ButtonText>
                            {isCompleted ? "Done" : "Complete"}
                          </ButtonText>
                        </Button>
                      </HStack>
                    );
                  })}

                {dashboardData.habits.filter(
                  (habit) =>
                    habit.frequency === "DAILY" ||
                    (habit.frequency === "WEEKLY" &&
                      new Date().getDay() === 0) ||
                    (habit.frequency === "MONTHLY" &&
                      new Date().getDate() === 1)
                ).length > 3 && (
                  <Button
                    variant="outline"
                    onPress={() => navigation.navigate("Habits")}
                  >
                    <ButtonText>See More</ButtonText>
                  </Button>
                )}
              </VStack>
            )}
          </CardContent>
        </Card>

        {/* Todo Section */}
        <Card className="mb-4 p-4 rounded-lg">
          <CardHeader className="px-0">
            <HStack className="justify-between items-center w-full">
              <Heading size="md">Upcoming Tasks</Heading>
              <Button
                variant="link"
                onPress={() => navigation.navigate("Todos")}
              >
                <ButtonText>View All</ButtonText>
              </Button>
            </HStack>
          </CardHeader>
          <CardContent className="px-0">
            {dashboardData.todos.length === 0 ? (
              <Box className="py-4 items-center">
                <Text>No pending tasks. Create a new task!</Text>
                <Button
                  className="mt-2"
                  variant="solid"
                  onPress={() => navigation.navigate("CreateTodo")}
                >
                  <ButtonText>Create Task</ButtonText>
                </Button>
              </Box>
            ) : (
              <VStack space="md">
                {dashboardData.todos.slice(0, 4).map((todo) => (
                  <HStack
                    key={todo.id}
                    className="justify-between items-center p-3 bg-backgroundLight100 rounded-md"
                  >
                    <HStack space="md" className="items-center flex-1">
                      <Box
                        className={cn("p-2 rounded-md", {
                          bg: todo.category?.colorCode || "$secondary100",
                        })}
                      >
                        <Icon
                          as={LucideList}
                          size="sm"
                          color={
                            todo.category?.colorCode ? "white" : "secondary-500"
                          }
                        />
                      </Box>
                      <VStack>
                        <Text className="font-medium">{todo.name}</Text>
                        {todo?.dueDate && (
                          <Text className="text-xs text-textLight500">
                            Due:{" "}
                            {format(
                              parseISO(todo.dueDate.toString()),
                              "MMM d, yyyy"
                            )}
                          </Text>
                        )}
                      </VStack>
                    </HStack>

                    <Button
                      size="sm"
                      variant="outline"
                      onPress={() => markTodoComplete(todo.id)}
                    >
                      <Icon as={LucideCheck} size="sm" />
                    </Button>
                  </HStack>
                ))}

                {dashboardData.todos.length > 4 && (
                  <Button
                    variant="outline"
                    onPress={() => navigation.navigate("Todos")}
                  >
                    <ButtonText>See More</ButtonText>
                  </Button>
                )}
              </VStack>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="p-4 rounded-lg" variant="elevated">
          <CardHeader className="px-0">
            <Heading size="md">Analytics</Heading>
          </CardHeader>
          <CardContent className="px-0">
            <HStack space="md" className="flex-wrap">
              <Pressable
                onPress={() => navigation.navigate("Analytics")}
                className="flex-2 min-w-24"
              >
                <Box className="p-4 bg-primaryLight50 rounded-lg items-center">
                  <Icon as={LucideTrendingUp} size="lg" color="$primary500" />
                  <Icon as={LucideTrendingUp} size="lg" color="$primary500" />
                  <Text className="mt-2 font-bold text-lg">
                    {dashboardData.stats.weeklyHabitsTotal === 0
                      ? 0
                      : Math.round(
                          (dashboardData.stats.weeklyHabitsCompleted /
                            dashboardData.stats.weeklyHabitsTotal) *
                            100
                        )}
                    %
                  </Text>
                  <Text className="text-sm">Weekly Success</Text>
                </Box>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Categories")}
                className="flex-2 min-w-24"
              >
                <Box className="p-4 bg-secondary-50 rounded-lg items-center">
                  <Text className="font-bold text-lg">
                    {dashboardData.categories.length}
                  </Text>
                  <Text className="text-sm">Categories</Text>
                </Box>
              </Pressable>
            </HStack>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onPress={() => navigation.navigate("Analytics")}
            >
              <ButtonText>View Detailed Analytics</ButtonText>
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </ScrollView>
  );
};

export default Dashboard;
