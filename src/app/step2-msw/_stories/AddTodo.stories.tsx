import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import Page from "../page";
import { errorHandler } from "@/mocks/handlers/todos/addTodo";

const meta = {
  title: "Work/<Step2.> MSW で Web API のレスポンスをモック/2. Todo追加",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

//↓ 各テストケースで流用するTodo追加操作
const AddTodo: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const typingWord = "トイレットペーパーを買う";
    await userEvent.type(canvas.getByPlaceholderText("Todo..."), typingWord, {
      delay: 150,
    });
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));
  },
};

export const Success: Story = {
  name: "成功",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo追加の操作をシミュレート
    await AddTodo.play?.(context);

    //↓ Todoが追加されているかを確認...できない
  },
};

export const Failure: Story = {
  name: "失敗",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo追加の操作をシミュレート
    await AddTodo.play?.(context);

    //↓ エラーメッセージが表示されているか確認
  },
};
