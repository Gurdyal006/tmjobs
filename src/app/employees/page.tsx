"use client";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";

import { Table, Tag, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function EmployeePage() {
  const { currentUser } = useSelector((state: any) => state.users);

  const [userInfo, setUserInfo] = useState<any>(null);
  const [userEmails, setUserEmails] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();

  //   const [totalJobs, setTotalJobs] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  //   const pageSize = 10;

  const fetchUserEmployeeInfo = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/v1/users/employees`);
      // Transform data to combine rows with the same email
      const transformedData = transformData(response.data.data);
      setUserInfo(transformedData);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchUserEmployeeInfo();
  }, []);

  // Function to transform data
  // const transformData = (data: any[]) => {
  //   const transformedData: any[] = [];
  //   const emailMap: { [email: string]: any } = {};

  //   data.forEach((item: any) => {
  //     const email = item.user.email;
  //     if (!emailMap[email]) {
  //       emailMap[email] = { ...item, email };
  //       transformedData.push(emailMap[email]);
  //     } else {
  //       // Merge additional information if email already exists
  //       emailMap[email] = { ...emailMap[email], ...item };
  //     }
  //   });

  //   return transformedData;
  // };
  // option 2
  // const transformData = (data: any[]) => {
  //   const transformedData: any[] = [];
  //   const jobTitlesMap: { [email: string]: string[] } = {};

  //   data.forEach((item: any) => {
  //     const email = item.user.email;
  //     if (!jobTitlesMap[email]) {
  //       jobTitlesMap[email] = [];
  //     }
  //     if (item.job) {
  //       jobTitlesMap[email].push(`${item.job.title} (${item.status})`); // Include status with job title
  //     }
  //   });

  //   data.forEach((item: any) => {
  //     const email = item.user.email;
  //     if (!transformedData.some((entry) => entry.user.email === email)) {
  //       transformedData.push({
  //         user: item.user,
  //         email: item.user.email, // Add email to transformed data
  //         jobTitles: jobTitlesMap[email] || [],
  //         status: item.status,
  //       });
  //     }
  //   });

  //   return transformedData;
  // };

  // option 3
  const transformData = (data: any[]) => {
    const transformedData: any[] = [];
    const jobTitlesMap: {
      [email: string]: { title: string; status: string }[];
    } = {};

    data.forEach((item: any) => {
      const email = item.user.email;
      if (!jobTitlesMap[email]) {
        jobTitlesMap[email] = [];
      }
      if (item.job) {
        jobTitlesMap[email].push({
          title: item.job.title,
          status: item.status,
        }); // Include status with job title
      }
    });

    data.forEach((item: any) => {
      const email = item.user.email;
      if (!transformedData.some((entry) => entry.user.email === email)) {
        transformedData.push({
          user: item.user,
          email: item.user.email,
          jobTitlesAndStatus: jobTitlesMap[email] || [],
          jobDescription: item.job?.description, // Include job description for expanded row
        });
      }
    });

    return transformedData;
  };

  const expandedRowRender = (record: any) => (
    <Table
      className="my-3"
      style={{ width: "60%" }} // Set the width of the table
      columns={[
        { title: "Job Title", dataIndex: "title", key: "title" },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (status: string) => (
            <span>
              <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
                {status}
              </Tag>
            </span>
          ),
        },
      ]}
      dataSource={record.jobTitlesAndStatus}
      pagination={false}
    />
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#faad14";
      case "Shortlist":
        return "#52c41a";
      case "OnHold":
        return "#1890ff";
      case "Rejected":
        return "#f5222d";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <ClockCircleOutlined />;
      case "Shortlisted":
        return <CheckCircleOutlined />;
      case "OnHold":
        return <MinusCircleOutlined />;
      case "Rejected":
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const tableColumns: any = [
    {
      title: "Name",
      dataIndex: "user",
      render: (user: any) => user.name,
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "user",
      render: (user: any) => user.phone,
    },
    // {
    //   title: "",
    //   key: "expand",
    //   width: 50,
    //   render: () => <PlusOutlined style={{ cursor: "pointer" }} />,
    // },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle title="Listing Employees" />
      </div>

      <div className="my-3">
        <Table
          columns={tableColumns}
          dataSource={userInfo}
          expandable={{
            expandedRowRender,
            expandIconColumnIndex: 3,
            expandIcon: ({ expanded, onExpand, record }: any) =>
              expanded ? (
                <MinusCircleOutlined onClick={() => onExpand(record, false)} />
              ) : (
                <PlusOutlined onClick={() => onExpand(record, true)} />
              ),
          }}
          // bordered
        />
      </div>
    </>
  );
}

export default EmployeePage;
