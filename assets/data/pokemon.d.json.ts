declare const pokemon: any[]
export default pokemon

// Trick to make VSCode IntelliSense and other IDEs to not slow down with large JSON files
// Make sure you also enable "compilerOptions.allowArbitraryExtensions: true" in tsconfig.json
// You need a declaration file like this for each large JSON file you need to import in your code.
// https://github.com/microsoft/TypeScript/issues/48364#issuecomment-1384518686
