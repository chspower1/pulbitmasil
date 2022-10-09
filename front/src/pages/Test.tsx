import React from "react";
import $ from "jquery";
import "fullpage.js";

export default function Test() {
  $((): void => {
    ($("#fullpage") as any).fullpage({
      scrollOverflow: true,
    });
  });
  return (
    <div id="fullpage">
      <div className="section fp-scrollable">
        <div style={{ height: "200vh" }}>first page</div>
      </div>
      <div className="section">second page</div>
      <div className="section">third page</div>
    </div>
  );
}
