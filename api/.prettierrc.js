/** @type {import("prettier").Config} */
export default {
  // Adiciona ponto e vírgula no final das instruções
  semi: true,

  // Usa aspas simples ao invés de duplas
  singleQuote: false,

  // Usa aspas simples em JSX ao invés de duplas
  jsxSingleQuote: false,

  // Largura de indentação (número de espaços)
  tabWidth: 2,

  // Usa tabs ao invés de espaços
  useTabs: false,

  // Largura máxima de uma linha antes de quebrar
  printWidth: 80,

  // Adiciona vírgula no final de listas/objetos multilinha
  // "all" = sempre | "es5" = onde válido no ES5 | "none" = nunca
  trailingComma: "all",

  // Adiciona espaços entre chaves de objetos: { foo: bar }
  bracketSpacing: true,

  // Coloca ">" de JSX multiline na última linha ao invés de uma nova linha
  bracketSameLine: false,

  // Parênteses em arrow functions com um único argumento
  // "always" = (x) => x | "avoid" = x => x
  arrowParens: "always",

  // Final de linha: "lf" = \n (unix) | "crlf" = \r\n (windows) | "auto"
  endOfLine: "lf",
};
