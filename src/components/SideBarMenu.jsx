import { React, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const MainContainer = styled.div``;

const Menu = styled.div`
  display: flex;
  color: white;
  gap: 10px;
  padding: 15px 10px;
  text-decoration: none;
  border-right: 4px solid transparent;
  transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  justify-content: space-between;
  font-size: 15px;
`;
const MenuItem = styled.div`
  display: flex;
  gap: 10px;
`;
const LinkIcon = styled.div``;

const LinkText = styled(motion.div)``;

const ArrowDown = styled.div``;

const NavLinkContainer = styled(NavLink)`
  display: flex;
  color: white;
  gap: 5px;
  padding: 10px 10px;
  text-decoration: none;
  border-right: 4px solid transparent;
  transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  white-space: nowrap;
  font-size: 13px;
  /* border-bottom: #fff 0.5px solid; */
  padding-left: 25px;
  &:hover {
    border-right: 4px solid white;
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    background-color: rgb(45, 51, 89);
  }
  &.active {
    border-right: 4px solid white;
    background-color: rgb(45, 51, 89);
  }

  /* &[aria-current] {
    border-right: 4px solid white;
    background-color: rgb(45, 51, 89);
  } */
`;

const MotionConatiner = styled(motion.div)``;

const menuAnimation = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },

  show: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const SideBarMenu = ({ isOpen, route, showAnimation, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };
  return (
    <MainContainer>
      <Menu onClick={toggleMenu}>
        <MenuItem>
          <LinkIcon>{route.icon}</LinkIcon>
          <AnimatePresence>
            {isOpen && (
              <LinkText
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {route.name}
              </LinkText>
            )}
          </AnimatePresence>
        </MenuItem>
        <ArrowDown>
          {isOpen && (
            <MotionConatiner
              animate={isMenuOpen ? { rotate: 0 } : { rotate: 90 }}
            >
              {" "}
              <FaAngleDown />
            </MotionConatiner>
          )}
        </ArrowDown>
      </Menu>
      {isOpen && (
        <AnimatePresence>
          {isMenuOpen && (
            <MotionConatiner
              variants={menuAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {route.subRoutes.map((subRoute, index) => (
                <NavLinkContainer to={subRoute.path} key={index}>
                  <LinkIcon>{subRoute.icon}</LinkIcon>
                  <AnimatePresence>
                    {isOpen && (
                      <LinkText variants={showAnimation}>
                        {subRoute.name}
                      </LinkText>
                    )}
                  </AnimatePresence>
                </NavLinkContainer>
              ))}
            </MotionConatiner>
          )}
        </AnimatePresence>
      )}
    </MainContainer>
  );
};

export default SideBarMenu;
