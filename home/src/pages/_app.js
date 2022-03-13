import { useEffect } from "react";
import Router from "next/router";
// Load DM Sans typeface
import "typeface-dm-sans";

// Load other package css file
import "react-multi-carousel/lib/styles.css";
import "react-modal-video/css/modal-video.min.css";
import "rc-drawer/assets/index.css";
import "assets/dropStyle.css";


export default function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
