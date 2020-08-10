interface StarterGui extends BasePlayerGui {
	ScreenGui: ScreenGui & {
		Script: Script;
		Frame: Frame & {
			Right: TextButton;
		};
	};
}

interface LotGui extends BasePlayerGui {
	ScreenGui: ScreenGui & {
		Frame: Frame & {
			Right: TextButton;
			Left: TextButton;
			Submit: TextButton;
		};
	};
}

