interface Workspace extends WorldRoot {
	Terrain: Terrain;
	Camera: Camera;
	Baseplate: Part;
	Grids: Folder & {
		Grid2: Part;
		Grid4: Part;
		Grid3: Part;
		Grid1: Part;
	};
}
