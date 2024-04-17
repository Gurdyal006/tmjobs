"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Tooltip, message } from "antd";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/usersSlice";
import Loader from "./Loader";
import { SetLoading } from "@/redux/loaderSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  AlignLeftOutlined,
  DoubleLeftOutlined,
  DownloadOutlined,
  FileAddOutlined,
  HomeOutlined,
  PoweroffOutlined,
  SaveOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [menuItems, setMenuItems] = useState([
    {
      name: "Home",
      path: "/",
      icon: <HomeOutlined />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserOutlined />,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: <DownloadOutlined />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <SettingOutlined />,
    },
    {
      name: "Saved",
      path: "/saved",
      icon: <SaveOutlined />,
    },
  ]);

  const pathname = usePathname();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/v1/users/currentUser");

      const isEmployer = response.data.data.userType === "employer";
      if (isEmployer) {
        const empTempMenu = menuItems;
        empTempMenu[2].name = "Posted Jobs";
        empTempMenu[2].path = "/jobs";
        empTempMenu[2].icon = <FileAddOutlined />;
        empTempMenu[3].name = "Skills";
        empTempMenu[3].path = "/technologies";
        // empTempMenu[4].icon = <TeamOutlined />;
        // empTempMenu[4].name = "employees";
        // empTempMenu[4].path = "/employees";
        setMenuItems(empTempMenu);
      }

      if (!isEmployer) {
        const empTempMenu = menuItems;
        empTempMenu[2].name = "Applications";
        empTempMenu[2].path = "/applications";
        empTempMenu[3].name = "Settings";
        empTempMenu[3].path = "/settings";
        setMenuItems(empTempMenu);
      }

      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      router.push("/login");
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register" && !currentUser) {
      getCurrentUser();
    }
  }, [pathname]);

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/v1/users/logout");
      message.success("Logged out successfully");
      dispatch(SetCurrentUser(null));
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <html lang="en">
      {/* <head></head> */}
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#000000",
            },
          }}
        >
          {loading && <Loader />}

          {pathname === "/login" || pathname === "/register" ? (
            <div>{children}</div>
          ) : (
            currentUser && (
              <div className="layout-parent">
                <div
                  className="sidebar"
                  style={{
                    width: isSidebarExpanded ? "250px" : "auto",
                  }}
                >
                  <div className="logo">
                    {isSidebarExpanded && (
                      <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        Job Portal
                      </motion.h1>
                    )}
                    {!isSidebarExpanded && (
                      <AlignLeftOutlined
                        className="custom-icon"
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                      />
                    )}
                    {isSidebarExpanded && (
                      <DoubleLeftOutlined
                        className="custom-icon"
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                      />

                      // <i
                      //   icon={<DownloadOutlined />}
                      //   onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                      // ></i>
                    )}
                  </div>

                  <div className="menu-items">
                    {menuItems.map((item, index) => {
                      const isActive = pathname === item.path;

                      return (
                        <div
                          className={`menu-item ${
                            isActive ? "active-menu-item" : ""
                          }`}
                          style={{
                            justifyContent: isSidebarExpanded
                              ? "flex-start"
                              : "center",
                          }}
                          key={index}
                          onClick={() => router.push(item.path)}
                        >
                          {item.icon}
                          <span>{isSidebarExpanded && item.name}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="user-info flex justify-between items-center">
                    {isSidebarExpanded && (
                      <div className="flex flex-col">
                        <span>{currentUser?.name}</span>
                        {/* <span>{currentUser?.email}</span> */}
                        <span>({currentUser?.userType})</span>
                      </div>
                    )}

                    {/* // logout  */}
                    <Tooltip title="Click to Logout">
                      <PoweroffOutlined
                        className="custom-icon"
                        onClick={onLogout}
                      />
                    </Tooltip>

                    {/* <i className="ri-logout-box-r-line" onClick={onLogout}></i> */}
                  </div>
                </div>
                <div className="body">{children}</div>
              </div>
            )
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}

export default LayoutProvider;
