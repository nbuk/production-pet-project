import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { buildFileLoader } from "./loaders/buildFileLoader";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: "@svgr/webpack", options: { icon: true } }],
  };

  const cssLoaders = buildCssLoader(isDev);
  const fileLoader = buildFileLoader();
  const codeBabelLoader = buildBabelLoader({ isTsx: true });
  const tsxBabelLoader = buildBabelLoader({ isTsx: false });

  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   // use: "ts-loader",
  //   use: [
  //     {
  //       loader: "ts-loader",
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypescript()].filter(Boolean),
  //         }),
  //         transpileOnly: isDev,
  //       },
  //     },
  //   ],
  //   exclude: /node_modules/,
  // };

  return [fileLoader, svgLoader, codeBabelLoader, tsxBabelLoader, cssLoaders];
}
