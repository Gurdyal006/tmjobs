"use client";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Table, Tag, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Applications() {
  const { currentUser } = useSelector((state: any) => state.users);

  const [applications, setApplications] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/v1/applications?user=${currentUser._id}`
      );

      // if job data is exist check
      const filteredApplications = response.data.data.filter(
        (application: any) => application.job
      );

      setApplications(filteredApplications);
      console.log(filteredApplications);
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const tableColumns: any = [
    {
      title: "Application ID",
      dataIndex: "regId",
      // render: (job: any) => job?.regId,
    },
    { title: "Job Title", dataIndex: "job", render: (job: any) => job?.title },
    {
      title: "Company",
      dataIndex: "job",
      render: (job: any) => job?.user?.name,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any, record: any) => {
        let color, tagText;
        switch (text) {
          case "Pending":
            color = "#F29339"; // orange
            tagText = "Pending";
            break;
          case "Shortlisted":
            color = "#3f6600"; // green
            tagText = "Shortlisted";
            break;
          case "Onhold":
            color = "#626C92"; // blue
            tagText = "Onhold";
            break;
          case "Rejected":
            color = "#f5222d"; // red
            tagText = "Rejected";
            break;
          default:
            color = "inherit";
            tagText = "Unknown";
        }
        return (
          <Tag
            color={color}
            style={{
              border: `1px solid ${color}`,
              backgroundColor: "none",
              color: `${color}`,
            }}
          >
            {tagText}
          </Tag>
        );
      },
    },

    {
      title: "Posted On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YYYY A"),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle title="Listing Applications" />
      </div>

      <div className="my-3">
        <Table columns={tableColumns} dataSource={applications} />
      </div>
    </>
  );
}

export default Applications;
