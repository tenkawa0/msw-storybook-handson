import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";

import Page from "../page";

const meta = {
  title:
    "Work/<Step1.> StorybookのPlay functionを使ってユーザー操作をテストする",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddTodo: Story = {
  name: "1. Todo追加",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo追加の操作をシミュレート

    //↓ Todoが追加されているか確認
  },
};

export const DeleteTodo: Story = {
  name: "2. Todo削除",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo追加の操作をシミュレート

    //↓ 追加されたTodoを削除

    //↓ Todoがないことを確認
  },
};
