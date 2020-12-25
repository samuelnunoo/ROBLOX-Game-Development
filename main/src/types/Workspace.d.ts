interface Workspace extends WorldRoot {
	Terrain: Terrain;
	Camera: Camera;
	Baseplate: Part;
	Lots: Folder & {
		Grid: Part & {
			LotType:StringValue
		}
	};
	CameraPoint: BasePart;
}
