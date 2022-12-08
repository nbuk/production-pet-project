import webpack from "webpack";
import { BuildOptions } from "./types/config";
import ReactRefreshTypescript from "react-refresh-typescript";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { buildFileLoader } from "./loaders/buildFileLoader";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: "@svgr/webpack", options: { icon: true } }],
  };

  const cssLoaders = buildCssLoader(isDev);
  const fileLoader = buildFileLoader();

  const typescriptLoader = {
    test: /\.tsx?$/,
    // use: "ts-loader",
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypescript()].filter(Boolean),
          }),
          transpileOnly: isDev,
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [fileLoader, svgLoader, typescriptLoader, cssLoaders];
}
