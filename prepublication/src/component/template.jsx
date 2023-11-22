import * as React from "react";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SideBar from "./sideBar";
import Box from "@mui/material/Box";

const drawerWidth = 350;

export default function Template({children}) {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Ethereum Decentralized Application (Dapp) :
						Prepublication Platform
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto", mt: 3 }}>
					<SideBar/>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
                {children}
			</Box>
		</Box>
	);
}
