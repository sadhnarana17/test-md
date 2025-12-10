const figmaVariables = require("./variables.json");

const tokensCollection = "Tokens";
const primitivesCollection = "Primitives";

const assignTokenColorValues = (tokens, primitives, postfix = "") => {
  return tokens?.reduce((acc, token) => {
    const tokenPathName = token.name.split("/");
    const className = tokenPathName[tokenPathName.length - 1] + postfix;
    const color = primitives.find(({ name }) => name === token.value.name);
    return {
      ...acc,
      [className]: color ? color.value : token.value,
    };
  }, {});
};

const figmaVariablesToStyleDictionary = (variablesJSON = figmaVariables) => {
  const collections = variablesJSON.collections && variablesJSON.collections;
  const primitives = collections.find(
    (collection) => collection.name === primitivesCollection
  );
  const primitiveVariables = primitives && primitives?.modes[0]?.variables;

  const tokens = collections.find(
    (collection) => collection.name === tokensCollection
  );
  const tokenVariables = tokens?.modes?.find(
    (mode) => mode.name === "Light"
  )?.variables;
  const tokenDarkVariables = tokens?.modes?.find(
    (mode) => mode.name === "Dark"
  )?.variables;

  const colorTokens = tokenVariables?.filter(({ type }) => type === "color");
  const colors = assignTokenColorValues(colorTokens, primitiveVariables);

  const colorDarkTokens = tokenDarkVariables?.filter(
    ({ type }) => type === "color"
  );
  const darkColors = assignTokenColorValues(
    colorDarkTokens,
    primitiveVariables,
    "-dark"
  );
  console.log(colors)

  return {
    colors: {
      ...colors,
      ...darkColors,
    },
  };
};

module.exports = {
  figmaVariablesToStyleDictionary,
};
