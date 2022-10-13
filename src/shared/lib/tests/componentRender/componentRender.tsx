import { ReactNode } from "react";
import { render, RenderResult } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "shared/config/i18n/i18nForTests";
import { MemoryRouter } from "react-router-dom";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { DeepPartial } from "@reduxjs/toolkit";

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
}

export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}): RenderResult {
  const { route = "/", initialState } = options;

  return (
    render(
      <StoreProvider initialState={initialState as StateSchema}>
        <MemoryRouter initialEntries={[route]}>
          <I18nextProvider i18n={i18n}>
            {component}
          </I18nextProvider>
        </MemoryRouter>
      </StoreProvider>,
    )
  );
}
