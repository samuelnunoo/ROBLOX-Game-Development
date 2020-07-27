interface StarterGui extends BasePlayerGui {
	ScreenGui: ScreenGui & {
		Script: Script;
		Frame: Frame & {
			Right: TextButton;
		};
	};
}
