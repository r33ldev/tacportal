import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PageChange from "components/PageChange/PageChange.js";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import ReactDOM from "react-dom";
import "styles/tailwind.css";




Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`

=========================================================
* TAC Scholarship Portal Built by Dev Michael LLC (https://mikeadebisi.com)
=========================================================

* Proposed Product Page: https://tacscholarship.net
* Copyright 2021 Dev Michael LLC (https://mikeadebisi.com)
* Licensed under MIT (https://dev.mikeadebisi.com/licenses/MIT)


* Coded by - Michael E Adebisi | Dev Michael LLC ~ mikeadebisi.com
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);
    const client = new ApolloClient({
      uri: 'http://localhost:5000/graphql',
      cache: new InMemoryCache()
    });
    return (
      <ApolloProvider client={client}>

        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>The Afternoon Church scholarship portal</title>
            <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </React.Fragment>
      </ApolloProvider>

    );
  }
}
