import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";

import Page from "../page";

const meta = {
  title: "Work/<Step2.> MSW で Web API のレスポンスをモック/1. Todo取得",
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

    //↓ Todoが取得できているか確認
  },
};

export const Failure: Story = {
  name: "失敗",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ ローディング表示が消えることを確認

    //↓ エラーメッセージが表示されているか確認
  },
};
