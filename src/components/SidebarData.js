import { HiOutlineDesktopComputer } from "react-icons/hi";
// import { TbPoint } from "react-icons/tb";

export const routes = [
    {
      path: "/contabo",
      name: "Contabo",
      icon: <HiOutlineDesktopComputer />,
      // subRoutes: [
      //   {
      //     path: "/contabo/instances",
      //     name: "Instances",
      //     icon: <TbPoint />,
      //   },
      //   {
      //     path: "/contabo/screenshots",
      //     name: "Snapshots",
      //     icon: <TbPoint />,
      //   },
      // ],
    },
    {
      path: "/aws",
      name: "AWS",
      icon: <HiOutlineDesktopComputer />,
    },
    {
      path: "/alicloud",
      name: "AliCloud",
      icon: <HiOutlineDesktopComputer />,
    },
    {
      path: "/vultr",
      name: "Vultr",
      icon: <HiOutlineDesktopComputer />,
    },
    {
      path: "/digitalocean",
      name: "Digital Ocean",
      icon: <HiOutlineDesktopComputer />,
    },
  ];