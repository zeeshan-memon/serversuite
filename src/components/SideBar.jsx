import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SideBarMenu from "./SideBarMenu";
import { routes } from "./SidebarData";
import ProfileMenu from "./ProfileMenu";
import context from "../context/Context";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

const UserProfile = styled.div`
  display: flex;
  position: absolute;
  padding: 5px;
  z-index: 1;
  right: 0%;
  padding-right: 15px;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  color: #000000;
  font-size: 14px;
  padding-right: 3px;
`;

const UserLogo = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  cursor: pointer;
`;
const MotionDiv = styled(motion.div)`
  background: rgb(0, 7, 61);
  color: white;
  height: 100vh;
  top: 0;
  left: 0;
  position: sticky;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Section = styled.section`
  color: white;
`;

const LinkIcon = styled.div``;

const LinkText = styled(motion.div)``;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;

const Logo = styled(motion.h1)`
  font-size: 13px;
  line-height: 0;
`;

const Bars = styled.div``;

const Main = styled.div`
  padding: 10px;
  width: 100%;
  flex: 1;
`;

const NavLinkContainer = styled(NavLink)`
  display: flex;
  color: white;
  gap: 10px;
  padding: 15px 10px;
  text-decoration: none;
  border-right: 4px solid transparent;
  transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  white-space: nowrap;
  font-size: 15px;
  &:hover {
    border-right: 4px solid white;
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    background-color: rgb(45, 51, 89);
  }
  &.active {
    border-right: 4px solid white;
    background-color: rgb(45, 51, 89);
  }
`;

// const LogOut = styled.div`
//   padding-right: 10px;
//   padding-bottom: 30px;
//   margin: 5px;
// `;

// const LogOutButton = styled.button`
//   color: #070707;
//   width: 100%;
//   /* background-color: #8da3a1; */
//   font-size: 16px;
//   width: 100%;
//   padding: 8px;
//   border-radius: 10px;

//   cursor: pointer;
//   &:hover {
//     /* background-color: rgb(75, 76, 82); */
//     background: rgb(142, 145, 167);
//     color: white;
//   }
// `;

const showAnimation = {
  hidden: {
    with: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },

  show: {
    width: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
    const {isLoggedIn} = useContext(context)
  return (
    <Wrapper>
        {isLoggedIn && <UserProfile>
        <UserProfileWrapper>
          <UserName>{localStorage.getItem("userName")}</UserName>
          <UserLogo>
            <ProfileMenu/>
          </UserLogo>
        </UserProfileWrapper>
      </UserProfile>
        }
      <MainContainer>
        <MotionDiv
          animate={{
            width: isOpen ? "200px" : "40px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 12,
            },
          }}
        >
          <div>
            <TopSection>
              {isOpen && (
                <Logo
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  ServerManagementSuit
                </Logo>
              )}
              <Bars>
                <FaBars onClick={toggle} />
              </Bars>
            </TopSection>
            <Section>
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SideBarMenu
                      showAnimation={showAnimation}
                      route={route}
                      isOpen={isOpen}
                      key={route.name}
                      setIsOpen={setIsOpen}
                    />
                  );
                }

                return (
                  <NavLinkContainer to={route.path} key={index}>
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
                  </NavLinkContainer>
                );
              })}
            </Section>
          </div>
          {/* <LogOut>
            <LogOutButton>LogOut</LogOutButton>
          </LogOut> */}
        </MotionDiv>
        <Main>{children}</Main>
      </MainContainer>
    </Wrapper>
  );
};

export default SideBar;
