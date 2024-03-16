import type { Meta, StoryObj } from "@storybook/react";
import Page from "../page";

const meta = {
  title: "Work/<Step1.> Play function",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ViewTodos: Story = {
  name: "Todo一覧表示",
};

export const AddTodo: Story = {
  name: "Todo追加",
};

export const DeleteTodo: Story = {
  name: "Todo削除",
};
