import React from "react";
import axios from "axios";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import { Todo } from "@/types/todo";
import Center from "@/components/Center";
import Loading from "@/components/Loading";
import TodoListItem from "./TodoListItem";
import ErrorAlert from "@/components/ErrorAlert";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx("p-6", "bg-background-paper", "rounded")}>
      {children}
    </div>
  );
}

export default function TodoList() {
  const { data, isError, isFetching } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axios.get("/todos");
      return data;
    },
  });

  if (isError) {
    return (
      <Container>
        <ErrorAlert />
      </Container>
    );
  }

  if (isFetching) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  const hasTodo = !!data && data.length > 0;

  return (
    <Container>
      <ul
        role="list"
        className={clsx("divide-y", "divide-gray-300", "m-0", "p-0")}
      >
        {hasTodo ? (
          data.map((item) => <TodoListItem key={item.id} todo={item} />)
        ) : (
          <Center>
            <p className={clsx("prose-sm", "text-disabled")}>
              Todoが登録されていません
            </p>
          </Center>
        )}
      </ul>
    </Container>
  );
}
