import { Divider, Modal } from "antd";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Table, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function JobModal({
  selectedJobs,
  showApplications,
  setShowApplications,
}: {
  selectedJobs: any;
  showApplications: any;
  setShowApplications: (showApplications: boolean) => void;
}) {
  const [applications, setApplications] = useState<any>(null);
  const dispatch = useDispatch();

  const fetchApplications = async () => {
    console.log("jobbbbbbbb");

    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/v1/applications?user=${selectedJobs._id}`
      ); // Fetch applications for the selected employee
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (showApplications) {
      fetchApplications(); // Fetch applications when modal is shown
    }
  }, [showApplications]);

  const tableColumns: any = [
    {
      title: "Job Title",
      dataIndex: "job",
      render: (job: any) => job.title,
    },
    {
      title: "Applied On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YYYY A"),
    },
  ];

  return (
    <Modal
      title={`Job Title Details`}
      visible={showApplications} // Changed 'open' to 'visible'
      onCancel={() => setShowApplications(false)}
      width={1200}
      footer={[
        <Button key="cancel" onClick={() => setShowApplications(false)}>
          Cancel
        </Button>,
      ]}
    >
      <Divider />
      <div className="my-3">
        <Table
          columns={tableColumns}
          dataSource={applications}
          pagination={false}
        />
      </div>
    </Modal>
  );
}

export default JobModal;
