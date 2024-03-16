import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import Page from "../../page";
import { errorHandler } from "@/mocks/handlers/todos/deleteTodo";
import { Success as GetTodos } from "./GetTodos.stories";

const meta = {
  title: "Work/<Step2.> MSW で Web API のレスポンスをモック/sample/3. Todo削除",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

//↓ 各テストケースで流用するTodo削除操作
const DeleteTodo: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const list = canvas.getByRole("list");
    const listItem = within(list).getAllByRole("listitem")[0];
    await userEvent.click(
      within(listItem).getByRole("button", { name: "Todoを削除する" }),
    );
  },
};

export const Success: Story = {
  name: "成功",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo取得
    await GetTodos.play?.(context);

    //↓ Todoを削除
    await DeleteTodo.play?.(context);

    //↓ 成功メッセージが表示されているか確認
    await waitFor(() => {
      expect(canvas.getByRole("alert")).toHaveTextContent("Todoを削除しました");
    });
  },
};

export const Failure: Story = {
  name: "失敗",
  parameters: {
    msw: {
      handlers: {
        deleteTodo: errorHandler,
      },
    },
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo追加の操作をシミュレート
    await GetTodos.play?.(context);

    //↓ 追加されたTodoを削除
    await DeleteTodo.play?.(context);

    //↓ エラーメッセージが表示されているか確認
    await waitFor(
      () => {
        expect(canvas.getByRole("alert")).toHaveTextContent(
          "エラーが発生しました",
        );
      },
      { timeout: 5000 },
    );
  },
};
