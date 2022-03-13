/** @jsx jsx */
import { jsx, Container, Flex, Button } from "theme-ui";
import { keyframes } from "@emotion/core";
import { Link } from "react-scroll";
import Logo from "components/logo";
import LogoDark from "assets/logo-dark.svg";
import LogoWhite from "assets/logo.svg";
import { DrawerProvider } from "../../contexts/drawer/drawer.provider";
import MobileDrawer from "./mobile-drawer";
import menuItems from "./header.data";

export default function Header({ className }) {
  return (
    <DrawerProvider>
      <header sx={styles.header} className={className} id="header">
        <Container sx={styles.container}>
          <Logo src={className === "sticky" ? LogoDark : LogoWhite} />

          <Flex as="nav" sx={styles.nav}>
            {menuItems.map(({ path, label }, i) => (
              <Link
                activeClass="active"
                to={path}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                key={i}
              >
                {label}
              </Link>
            ))}
          </Flex>
          <div className="dropdown">
          <Button
            className="donate__btn"
            variant="secondary"
            aria-label="Enrol"
          >
            Dashboard
          </Button>
            <div className="dropdown-content">
              <a href="https://dashboard.tacscholarship.net/account/enrol">Enrol{'  '}{'  '}{'  '}{'  '} ↗️ </a>
              <a href="https://dashboard.tacscholarship.net/account/login">Login{'  '} ↗️ </a>
              <a href="https://dashboard.tacscholarship.net/account/apply">Apply{'  '} ↗️</a>
            </div>
          </div>
         

          <MobileDrawer />
        </Container>
      </header>
    </DrawerProvider>
  );
}

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }
  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const styles = {
  header: {
    color: "white",
    fontWeight: "normal",
    py: 4,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    transition: "all 0.5s ease",
    animation: `${positionAnim} 0.4s ease`,
    ".donate__btn": {
      flexShrink: 0,
      mr: [15, 20, null, null, 0],
      ml: ["auto", null, null, null, 0],
    },
    "&.sticky": {
      position: "fixed",
      backgroundColor: "background",
      color: "#000000",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
      py: 3,
      "nev > a": {
        color: "text",
      },
      ".donate__btn": {
        borderColor: "primary",
        color: "primary",
        "&:hover": {
          boxShadow: "rgba(31, 62, 118, 0.57) 0px 9px 20px -5px",
          backgroundColor: "primary",
          color: "white",
        },
      },
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    mx: "auto",
    display: "none",
    "@media screen and (min-width: 1024px)": {
      display: "block",
    },
    a: {
      fontSize: "16px",
      fontWeight: "400",
      px: 25,
      cursor: "pointer",
      lineHeight: "1.2",
      "&.active": {
        color: "secondary",
      },
    },
  },
  // navbar: {
  //   overflow: 'hidden',
  //   backgroundColor: "#333"
  // },

  // navbarA: {
  //   float: "left",
  //   fontSize: '16px',
  //   color: 'white',
  //   textAlign: 'center',
  //   padding: '14px 16px',
  //   textDecoration: none,
  // },

  // dropdown :{
  //   float: 'left',
  //   overflow: 'hidden',
  // },

  // dropdownDropbtn : {
  //   fontSize: '16px',
  //   border: 'none',
  //   outline: 'none',
  //   color: 'white',
  //   padding: '14px 16px',
  //   backgroundColor: 'inherit',
  //   fontFamily: 'inherit',
  //   margin: 0,
  // },

  // // .navbar > a:hover, .dropdown:hover .dropbtn : {
  // //   background-color: red,
  // // },

  // dropdownContent : {
  //   display: none,
  //   position: absolute,
  //   background-color: #f9f9f9,
  //   min-width: 160px,
  //   box-shadow: 0px 8px 16px 0px rgba(0,0,0,02),
  //   z-index: 1,
  // },

  // dropdown-content a : {
  //   float: none,
  //   color: black,
  //   padding: 12px 16px,
  //   text-decoration: none,
  //   display: block,
  //   text-align: left,
  // },

  // dropdown-content a:hover : {
  //   background-color: #ddd,
  // },

  // dropdown:hover dropdown-content : {
  //   display: block,
  // }
};
