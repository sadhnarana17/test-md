const fs = require("fs");
const path = require("path");
const tokenConverter = require("./tokenConverter.cjs");

const theme = tokenConverter.figmaVariablesToStyleDictionary();

console.log(theme)

const themePath = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "designSystem",
  "theme",
  "theme.json"
);
const coloursPath = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "designSystem",
  "theme",
  "colours.scss"
);
try {
  fs.writeFileSync(themePath, JSON.stringify(theme, null, 2));
} catch (err) {
  console.error(err);
  fs.writeFileSync(themePath, JSON.stringify({}, null, 2));
}

try {
  let content = "";
  const allowedProperties = ["colors"];
  Object.entries(theme).forEach(([key, properties]) => {
    if (allowedProperties.includes(key)) {
      Object.entries(properties).forEach(([tokenName, tokenValue]) => {
        content += `$${tokenName}: ${tokenValue};\n`;
      });
    }
  });
  fs.writeFileSync(coloursPath, content);
} catch (err) {
  console.error(err);
  fs.writeFileSync(coloursPath, "");
}
