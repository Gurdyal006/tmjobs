import { Divider } from "antd";
import React from "react";

function PageTitle({ title }: { title: string }) {
  return (
    <div className="my-2">
      <h1 className="text-xl my-2">
        <b>{title}</b>
      </h1>
      <Divider />
    </div>
  );
}

export default PageTitle;
