import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import { BuildPaths } from "../build/types/config";
import path from "path";
import { buildCssLoader } from "../build/loaders/buildCssLoader";
import { buildFileLoader } from "../build/loaders/buildFileLoader";

export default ({
  config,
}: {
  config: webpack.Configuration;
}): webpack.Configuration => {
  const paths: BuildPaths = {
    build: "",
    entry: "",
    html: "",
    src: path.resolve(__dirname, "..", "..", "src"),
  };

  config.resolve?.modules?.push(paths.src);
  config.resolve?.extensions?.push(".ts", ".tsx");

  // @ts-expect-error
  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/.svg/.test(rule.test as string)) {
      return {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      };
    }

    return rule;
  });
  config.module?.rules.push(buildCssLoader(true));
  config.module?.rules?.push(buildFileLoader());
  config.plugins?.push(new DefinePlugin({
    __IS_DEV__: true,
    __API__: JSON.stringify(""),
  }));

  return config;
};
