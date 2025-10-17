module.exports = {
  verbose: true, // Muestra todas las pruebas individualmente en consola

  testEnvironment: "jsdom", // Necesario para componentes React
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest" // Transforma JSX con Babel
  },
  moduleFileExtensions: ["js", "jsx"],

  collectCoverage: true, // Activa la cobertura de código
  coverageDirectory: "coverage", // Carpeta donde se guardará
  coverageReporters: ["text", "lcov"], // Muestra texto y genera reporte HTML

  reporters: [
    "default", // Muestra resultados en consola
    [
      "jest-junit",
      {
        outputDirectory: "reports", // Carpeta donde se guarda el XML
        outputName: "junit.xml",
      }
    ],
    [
      "jest-html-reporter",
      {
        pageTitle: "Reporte de Pruebas Unitarias",
        outputPath: "reports/test-report.html",
        includeFailureMsg: true,
        includeSuiteFailure: true,
        includeConsoleLog: true
      }
    ]
  ],
};
