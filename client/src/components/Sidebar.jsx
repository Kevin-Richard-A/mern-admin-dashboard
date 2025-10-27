import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutline,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/Profile.png";

const sidbarItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transaction",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutline />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,
  isNonMobile,
  isSidebarOpen,
  setIsSidebarOpen,
  drawerWidth,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = theme.palette;

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component={"nav"}>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: colors.secondary[200],
              backgroundColor: colors.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box
            width={"100%"}
            height={"100%"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box m={"1.5rem 2rem 2rem 3rem"}>
              <FlexBetween color={colors.secondary.main}>
                <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
                  <Typography variant="h4" fontWeight={"bold"}>
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <Divider />
            <List
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                "& .MuiListItemButton-root": {
                  padding: "8px 32px 8px 24px",
                },
                "& .MuiListItemIcon-root": {
                  minWidth: "0px",
                  marginRight: "16px",
                },
                "& .MuiListItemText-primary": {
                  fontWeight: "bold",
                },
              }}
            >
              {sidbarItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? colors.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? colors.primary[600]
                            : colors.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? colors.primary[600]
                              : colors.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Box>
              <Divider />
              <FlexBetween
                textTransform={"none"}
                gap={"1rem"}
                m={"1.5rem 1rem"}
              >
                <Box
                  component={"img"}
                  alt="profile"
                  src={profileImage}
                  height={"40px"}
                  width={"40px"}
                  borderRadius={"50%"}
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign={"left"}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"0.9rem"}
                    sx={{ color: colors.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize={"0.8rem"}
                    sx={{ color: colors.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{ color: colors.secondary[300], fontSize: "25px" }}
                />
              </FlexBetween>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
