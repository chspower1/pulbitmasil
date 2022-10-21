import React from "react";
import { Helmet } from "react-helmet-async";
export default function Seo() {
  return (
    <Helmet>
      <title>풀빛마실</title>
      <meta name="description" content="Home Description" />
      <meta property="og:title" content="풀빛마실" />
      <meta property="og:description" content="지구를 위해! 우리를 위해! 떠나볼까요?" />
      <meta
        property="og:image"
        content="https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
}
