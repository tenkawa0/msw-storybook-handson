import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, waitFor } from "@storybook/test";

import Page from "../../page";
import { errorHandler } from "@/mocks/handlers/todos/getTodos";

const meta = {
  title: "Work/<Step2.> MSW で Web API のレスポンスをモック/sample/1. Todo取得",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  name: "成功",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ ローディング表示が消えることを確認
    await waitFor(() => {
      expect(canvas.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    //↓ Todoが取得できているか確認
    const list = canvas.getByRole("list");
    expect(within(list).getAllByRole("listitem")).not.toHaveLength(0);
  },
};

export const Failure: Story = {
  name: "失敗",
  parameters: {
    msw: {
      handlers: {
        getTodos: errorHandler,
      },
    },
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ ローディング表示が消えることを確認
    await waitFor(
      () => {
        expect(canvas.queryByRole("progressbar")).not.toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    //↓ エラーメッセージが表示されているか確認
    expect(canvas.getByRole("alert")).toHaveTextContent("エラーが発生しました");
  },
};
