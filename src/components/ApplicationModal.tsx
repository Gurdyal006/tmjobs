"use client";
import { Divider, Modal, Tooltip } from "antd";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Table, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ApplicationModal({
  selectedJobs,
  showApplications,
  setShowApplications,
}: {
  selectedJobs: any;
  showApplications: any;
  setShowApplications: (showApplications: boolean) => void;
}) {
  const [applications, setApplications] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/v1/applications?job=${selectedJobs._id}`
      );
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onStatusUpdate = async (applicationId: string, status: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.put(
        `/api/v1/applications/${applicationId}`,
        {
          status,
        }
      );
      message.success(response.data.message);
      fetchApplications();
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
    { title: "Application ID", dataIndex: "_id" },
    { title: "Applicant", dataIndex: "user", render: (user: any) => user.name },
    { title: "Name", dataIndex: "user", render: (user: any) => user.name },
    { title: "Email", dataIndex: "user", render: (user: any) => user.email },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string, record: any) => (
        <select
          value={status}
          onChange={(event) => onStatusUpdate(record._id, event.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Shortlisted">ShortListed</option>
          <option value="Onhold">OnHold</option>
          <option value="Rejected">Rejected</option>
        </select>
      ),
    },

    {
      title: "Applied On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YYYY A"),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (applicationId: string, application: any) => (
        <Tooltip title="Click to view applicant info">
          <i
            className="ri-file-list-3-line"
            onClick={() => router.push(`/userInfo/${application.user._id}`)}
          ></i>
        </Tooltip>
        // <Button
        //   onClick={() => router.push(`/userInfo/${application.user._id}`)}
        // >
        //   View
        // </Button>
      ),
    },
  ];

  return (
    <Modal
      title={`Application For -  ${selectedJobs.title}`}
      open={showApplications}
      onCancel={() => setShowApplications(false)}
      width={1200}
    >
      <Divider />
      <div className="my-3">
        <Table columns={tableColumns} dataSource={applications} />
      </div>
    </Modal>
  );
}

export default ApplicationModal;
