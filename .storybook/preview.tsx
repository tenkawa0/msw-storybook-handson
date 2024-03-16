import React from "react";
import type { Preview } from "@storybook/react";
import { Layout } from "../src/app/layout.tsx";
import { initialize, mswLoader } from "msw-storybook-addon";

import { defaultHandlers } from "../src/mocks/handlers";
import "../src/app/globals.css";

initialize({ onUnhandledRequest: "warn" });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: defaultHandlers,
    },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <Layout>
        <Story />
      </Layout>
    ),
  ],
};

export default preview;
