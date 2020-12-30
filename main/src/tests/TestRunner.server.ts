import TestEZ from "@rbxts/testez"


const ServerScriptService = game.GetService("ServerScriptService")
const RunService = game.GetService("RunService")

if (RunService.IsStudio()) {
    const reporter = TestEZ.Reporters.TextReporterQuiet
    const results = TestEZ.TestBootstrap.run( [ ServerScriptService.Tests ], reporter)
}


