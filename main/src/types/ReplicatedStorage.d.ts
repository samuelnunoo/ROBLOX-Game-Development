interface ReplicatedStorage extends Instance {
	TS: Folder & {
		module: ModuleScript;
		["module.spec"]: ModuleScript;
	};
	Models: Folder & {
		[model:string] : Model;
	};
	serverGateway:RemoteEvent;
	UI: Folder & {
		LotUIController: ModuleScript;
	};
	["module.spec"]: ModuleScript;
	Logic: Folder & {
		BuildInterface: ModuleScript;
		LotSelection: Folder & {
			ClientLotInterface: ModuleScript;
			ClientLotManager: ModuleScript;
		};
		CameraLogic: ModuleScript;
		ClientMediator: ModuleScript;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			testez: Folder & {
				["package"]: ModuleScript;
				src: ModuleScript & {
					TestPlanner: ModuleScript;
					TestSession: ModuleScript;
					TestRunner: ModuleScript;
					TestBootstrap: ModuleScript;
					TestEnvironment: ModuleScript;
					LifecycleHooks: ModuleScript;
					Reporters: Folder & {
						TextReporter: ModuleScript;
						TextReporterQuiet: ModuleScript;
						TeamCityReporter: ModuleScript;
					};
					TestPlan: ModuleScript;
					TestResults: ModuleScript;
					TestPlanBuilder: ModuleScript;
					TestEnum: ModuleScript;
					Expectation: ModuleScript;
				};
				tsconfig: ModuleScript;
			};
			types: Folder & {
				include: Folder & {
					generated: Folder;
				};
				["package"]: ModuleScript;
			};
		};
	};
}
