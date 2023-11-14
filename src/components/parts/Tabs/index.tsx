import MuiTab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";

/**
 * Represents a tab's information
 */
export interface TabType {
	/**
	 * Used to uniquely identify each tab.
	 */
	key: string;
	/**
	 * The text to display on the tab.
	 */
	label: string;
	/**
	 * The URL to link to when the tab is clicked.
	 */
	to?: string;
}

/**
 * Properties for {@link Tabs}
 */
interface TabsProps {
	/**
	 * Determines what the initial tab is.
	 */
	initialKey: string;
	/**
	 * The tabs to display.
	 */
	tabs: TabType[];
	/**
	 * Executed when a tab is clicked.
	 */
	onSetKey?: (key: any) => void;
	/**
	 * An event when tab is changed.
	 */
	onChange?: (key: any) => void;
	/**
	 * Determines whether tabs are disabled or not.
	 */
	isDisabledTabs?: boolean;
}

/**
 * Renders tabs that execute a callback when clicked.
 *
 * @param props - See {@link TabsProps}
 */
export const Tabs = (props: TabsProps) => {
	const {
		tabs,
		initialKey,
		onSetKey,
		isDisabledTabs,
		onChange = () => null,
	} = props;
	const [activeKey, setActiveKey] = useState(initialKey);

	const handleChange = (_: any, key: string) => {
		onChange(key);
		setActiveKey(key);
		if (!!onSetKey) {
			onSetKey(key);
		}
	};

	useEffect(() => {
		setActiveKey(initialKey);
	}, [initialKey]);

	return (
		<MuiTabs
			variant="scrollable"
			scrollButtons="auto"
			sx={{ borderBottom: 2, borderColor: "divider" }}
			value={activeKey}
			onChange={handleChange}
			textColor="secondary"
			indicatorColor="secondary"
			TabIndicatorProps={{
				style: { height: 4 },
			}}
		>
			{tabs.map((tab) => (
				<MuiTab
					value={tab.key}
					label={tab.label}
					key={tab.key}
					disabled={isDisabledTabs}
					sx={{ fontWeight: "bold" }}
				/>
			))}
		</MuiTabs>
	);
};

export default Tabs;
