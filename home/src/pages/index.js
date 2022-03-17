import SEO from "components/seo";
import { StickyProvider } from "contexts/app/app.provider";
import React, {useState} from "react";
import Banner from "sections/banner";
import Sticky from 'react-stickynode';
import Header from '../components/header/header'
import theme from "theme";
import { ThemeProvider } from "theme-ui";

export default function IndexPage() {
  const [isSticky, setIsSticky] = useState(false);
  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    } else if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Sticky innerZ={1001} top={0} onStateChange={handleStateChange}>
          <Header className={`${isSticky ? "sticky" : "unSticky"}`} />
        </Sticky>
        <main
          sx={{
            variant: "layout.main",
          }}
        >
          <SEO title="The Afternoon Church Scholarship Portal" />
          <Banner />
        </main>
      </StickyProvider>
    </ThemeProvider>
  );
}
