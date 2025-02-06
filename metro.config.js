const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  "@components": `${__dirname}/src/components`,
  "@utils": `${__dirname}/src/utils`,
  "@theme": `${__dirname}/src/theme`,
  "@store": `${__dirname}/src/store`,
  "@screens": `${__dirname}/src/screens`,
  "@navigation": `${__dirname}/src/navigation`,
};

module.exports = defaultConfig;
