import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import Page from "../../page";
import { errorHandler } from "@/mocks/handlers/todos/updateTodoStatus";
import { Success as GetTodos } from "./GetTodos.stories";

const meta = {
  title: "Work/<Step2.> MSW で Web API のレスポンスをモック/sample/4. Todo完了",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

//↓ 各テストケースで流用するTodo完了操作
const DoneTodo: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const list = canvas.getByRole("list");
    const listItem = within(list).getAllByRole("listitem")[0];
    const checkbox = within(listItem).getByRole("checkbox");
    await userEvent.click(checkbox);
  },
};

export const Success: Story = {
  name: "成功",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo取得
    await GetTodos.play?.(context);

    //↓ Todoを完了
    await DoneTodo.play?.(context);

    //↓ 成功メッセージが表示されているか確認
    await waitFor(() => {
      expect(canvas.getByRole("alert")).toHaveTextContent("Todoを完了しました");
    });
  },
};

export const Failure: Story = {
  name: "失敗",
  parameters: {
    msw: {
      handlers: {
        updateTodoStatus: errorHandler,
      },
    },
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo追加の操作をシミュレート
    await GetTodos.play?.(context);

    //↓ Todoを完了
    await DoneTodo.play?.(context);

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
