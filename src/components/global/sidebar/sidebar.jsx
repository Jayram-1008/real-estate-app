import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    AppstoreOutlined,
    ProjectOutlined,
    AuditOutlined,
    UsergroupAddOutlined,
    DashboardOutlined,
    CustomerServiceOutlined,
    SettingOutlined,
    AppstoreFilled,
    CalendarOutlined

} from "@ant-design/icons";

import { Box } from "@mui/material";
import { Menu, ConfigProvider, Calendar } from "antd";
import { LogoLarge, LogoSmall } from "./logo";
import { useNavigate } from "react-router-dom";
import { CurrencyRupee } from "@mui/icons-material";

const Sidebar = ({ collapsed }) => {

    const navigate = useNavigate();

    const fullPath = useLocation();
    const location = fullPath.pathname == '/' ? '/' : fullPath.pathname.slice(1);
    const [defaultRoute, setDefaultRoute] = useState('/');

    useEffect(() => {
        setDefaultRoute(location);
    }, [fullPath]);

    const items = [
        {
            key: "grp1",
            icon: null,
            children: [
                {
                    key: "/",
                    icon: collapsed ? <AppstoreFilled /> : <AppstoreOutlined style={{ fontSize: "18px" }} />,
                    children: null,
                    label: "Dashboard",
                    type: undefined
                },
                {
                    key: "followup",
                    icon: <ProjectOutlined style={{ fontSize: "18px" }} />,
                    children: [
                        {
                            key: "new-follow-up",
                            icon: null,
                            children: null,
                            label: "New Follow UP",
                            type: undefined
                        },
                        {
                            key: "all-follow-up",
                            icon: null,
                            children: null,
                            label: "All Follow UP",
                            type: undefined
                        },
                        // {
                        //     key: "new-visit",
                        //     icon: null,
                        //     children: null,
                        //     label: "New Visit",
                        //     type: undefined
                        // },
                        // {
                        //     key: "add-customer",
                        //     icon: null,
                        //     children: null,
                        //     label: "Add Customer",
                        //     type: undefined
                        // },
                        // {
                        //     key: "visit-report",
                        //     icon: null,
                        //     children: null,
                        //     label: "Visit Report",
                        //     type: undefined
                        // }
                    ],
                    label: "Follow UP",
                    type: undefined
                },
                {
                    key: "associate",
                    icon: <UsergroupAddOutlined style={{ fontSize: "18px" }} />,
                    children: [
                        // {
                        //     key: "add-associate",
                        //     icon: null,
                        //     children: null,
                        //     label: "Add Associate",
                        //     type: undefined
                        // },
                        {
                            key: "level-view",
                            icon: null,
                            children: null,
                            label: "Team Level View",
                            type: undefined
                        },
                        {
                            key: "view-team",
                            icon: null,
                            children: null,
                            label: "Team Tree View",
                            type: undefined
                        }
                    ],
                    label: "Associate",
                    type: undefined
                },
                {
                    key: "booking-history",
                    icon: <AuditOutlined style={{ fontSize: "18px" }} />,
                    children: null,
                    label: "My Bookings",
                    type: undefined
                },
                {
                    key: "business-payment",
                    icon: <CurrencyRupee style={{ fontSize: "20px" }} />,
                    label: "Business Payment",
                    type: undefined
                },
                {
                    key: "view-attendence",
                    icon: <CalendarOutlined style={{ fontSize: "18px" }} />,
                    children: null,
                    label: "View Attendence",
                    type: undefined
                },
            ],
            label: collapsed ? "" : "MAIN MENU",
            type: "group"
        },
        {
            type: "group"
        },
        {
            type: "divider"
        },
        {
            type: "group"
        },
        {
            key: "grp2",
            icon: null,
            children: [
                {
                    key: "support",
                    icon: <CustomerServiceOutlined style={{ fontSize: "18px" }} />,
                    children: null,
                    label: "Support",
                    type: undefined
                },
                {
                    key: "setting",
                    icon: <SettingOutlined style={{ fontSize: "18px" }} />,
                    children: null,
                    label: "Setting",
                    type: undefined
                }
            ],
            label: "OTHER",
            type: "group"
        }
    ];
    // submenu keys of first level
    const rootSubmenuKeys = ["followup", "associate", "booking"];

    const [openKeys, setOpenKeys] = useState([""]);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <>
            <Box sx={{ borderBottom: "solid #b8b7b6 1px" }}>
                {collapsed ? <LogoSmall /> : <Box sx={{ padding: "10px" }}><LogoLarge /></Box>}
            </Box>

            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        borderRadius: 3
                    }
                }}
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["/"]}
                    selectedKeys={defaultRoute}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    onClick={(event) => {
                        navigate(event.key);
                    }}
                    inlineCollapsed={collapsed}
                    style={{
                        width: !collapsed ? 249 : 84,
                        fontSize: "16px",
                        padding: "0px 5px",
                        fontFamily: "Poppins, sans- serif"
                    }}
                    items={items}
                />
            </ConfigProvider>
        </>
    );
};
export default Sidebar;
