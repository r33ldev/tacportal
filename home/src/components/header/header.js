/** @jsx jsx */
import { jsx, Container, Flex, Button } from 'theme-ui';
import { keyframes } from '@emotion/core';
import Link from 'next/link';
import Logo from 'components/logo';
import LogoPng from 'assets/logo.png';
import { DrawerProvider } from '../../contexts/drawer/drawer.provider';
import MobileDrawer from './mobile-drawer';
import menuItems from './header.data';
import { useRouter } from 'next/router';

export default function Header({ className }) {
  const router = useRouter()
  return (
    <DrawerProvider>
      <header sx={styles.header} className={className} id="header">
        <Container sx={styles.container}>
          <Logo src={LogoPng} />

          <Flex as="nav" sx={styles.nav}>
            {menuItems.map(({ path, label }, i) => (


             <Link
                activeClass="active"
                href={path}
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
<div className='dropdown'>
<Button
              className="donate__btn"
              variant="secondary"
              aria-label="Enrol"
              onClick={() => router.push(`https://dashboard.${process.env.HOSTED_DOMAIN_NAME}/account/login`)}
            >
            

              Dashboard
        
            </Button>
            <div className="dropdown-content">
              <a
                href={`https://dashboard.${process.env.HOSTED_DOMAIN_NAME}/account/enrol`}
              >
                Enrol{"  "}
                {"  "}
                {"  "}
                {"  "} ↗{" "}
              </a>
              <a
                href={`https://dashboard.${process.env.HOSTED_DOMAIN_NAME}/account/login`}
              >
                Login{"  "} ↗
              </a>
              <a
                href={`https://dashboard.${process.env.HOSTED_DOMAIN_NAME}/account/apply`}
              >
                Apply{"  "} ↗{" "}
              </a>
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
    color: 'white',
    fontWeight: 'normal',
    py: 4,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    transition: 'all 0.5s ease',
    animation: `${positionAnim} 0.4s ease`,
    '.donate__btn': {
      flexShrink: 0,
      mr: [15, 20, null, null, 0],
      ml: ['auto', null, null, null, 0],
    },
    '&.sticky': {
      position: 'fixed',
      backgroundColor: 'background',
      color: '#000000',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
      py: 3,
      'nav > a': {
        color: 'secondary',
      },
      '.donate__btn': {
        borderColor: 'primary',
        color: 'primary',
        '&:hover': {
          boxShadow: 'rgba(31, 62, 118, 0.57) 0px 9px 20px -5px',
          backgroundColor: 'primary',
          color: 'white',
        },
      },
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    mx: 'auto',
    display: 'none',
    '@media screen and (min-width: 1024px)': {
      display: 'block',
      a: {
        fontSize: '16px',
        fontWeight: '400',
        px: 25,
        cursor: 'pointer',
        lineHeight: '1.2',
        color: 'white',
        textDecoration: 'none',
        '&.active': {
          color: 'secondary',
        }, "&:first-child":{color: 'secondary'},
      },
    },
  },
};
