import webpack from "webpack";
import { BuildOptions } from "./types/config";
import ReactRefreshTypescript from "react-refresh-typescript";
import { buildCssLoader } from "./loaders/buildCssLoader";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ["@svgr/webpack"],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  const cssLoaders = buildCssLoader(isDev);

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
