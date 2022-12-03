import { HiOutlineDesktopComputer } from "react-icons/hi";
// import { TbPoint } from "react-icons/tb";
import degitalOcean from "../images/digitialocean.png"
import vultr from "../images/vultrnew.png"
import aws from "../images/aws.png"
import aliCloud from "../images/alicloud.png"
import contabo from "../images/contabonew.png"

export const routes = [
    {
      path: "/contabo",
      name: "Contabo",
      icon: <HiOutlineDesktopComputer />,
      logo: contabo,
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
      logo: aws,
    },
    {
      path: "/alicloud",
      name: "AliCloud",
      icon: <HiOutlineDesktopComputer />,
      logo: aliCloud,
    },
    {
      path: "/vultr",
      name: "Vultr",
      icon: <HiOutlineDesktopComputer />,
      logo: vultr,
    },
    {
      path: "/digitalocean",
      name: "Digital Ocean",
      icon: <HiOutlineDesktopComputer />,
      logo: degitalOcean,
    },
  ];