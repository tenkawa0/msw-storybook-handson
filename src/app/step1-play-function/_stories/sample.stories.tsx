import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import Page from "../page";

const meta = {
  title:
    "Work/<Step1.> StorybookのPlay functionを使ってユーザー操作をテストする/sample",
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
    const typingWord = "トイレットペーパーを買う";
    await userEvent.type(canvas.getByPlaceholderText("Todo..."), typingWord, {
      delay: 150,
    });
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));

    //↓ Todoが追加されているか確認
    const list = canvas.getByRole("list");
    expect(within(list).getByRole("listitem")).toHaveTextContent(typingWord);
  },
};

export const DeleteTodos: Story = {
  name: "2. Todo削除",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo追加の操作をシミュレート
    await AddTodo.play?.(context);

    //↓ 追加されたTodoを削除
    const list = canvas.getByRole("list");
    const listItem = within(list).getByRole("listitem");
    await userEvent.click(
      within(listItem).getByRole("button", { name: "Todoを削除する" }),
    );

    //↓ Todoがないことを確認
    expect(within(list).queryByRole("listitem")).not.toBeInTheDocument();
  },
};

export const AddTodos: Story = {
  name: "3. Todo追加（複数）",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ AddTodoのplayを再生できる
    await AddTodo.play?.(context);

    //↓ 新たにTodoを追加する
    const typingWord = "家賃を振り込む";
    await userEvent.type(canvas.getByPlaceholderText("Todo..."), typingWord, {
      delay: 150,
    });
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));

    //↓ 複数確認のときはgetAllByRole()を使用する
    const list = canvas.getByRole("list");
    expect(within(list).getAllByRole("listitem")[0]).toHaveTextContent(
      typingWord,
    );
  },
};

export const DoneTodo: Story = {
  name: "4. Todo完了",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ AddTodoのplayを再生できる
    await AddTodo.play?.(context);

    //↓ 追加されたTodoを完了
    const list = canvas.getByRole("list");
    const listItem = within(list).getByRole("listitem");
    const checkbox = within(listItem).getByRole("checkbox");
    await userEvent.click(checkbox);

    //↓ Todoが完了したことを確認
    expect(checkbox).toBeChecked();
  },
};
