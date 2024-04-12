import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import moment from "moment";

function Exportcsv({ jobData }: any) {
  const headers = [
    { label: "Title", key: "title" },
    { label: "Job Type", key: "jobType" },
    { label: "Experience", key: "experience" },
    { label: "Location", key: "location" },
    { label: "Work Mode", key: "workMode" },
    { label: "Created", key: "createdAt" },
  ];

  const mapJobType = (type: string) => {
    switch (type) {
      case "full-time":
        return "Full Time";
      case "part-time":
        return "Part Time";
      case "contract":
        return "Contract";
      default:
        return type;
    }
  };
  // Ensure jobData is valid before processing
  const csvData = jobData
    ? jobData.map((job: any) => ({
        title: job.title,
        jobType: mapJobType(job.jobType),
        experience: `${job.experience} yrs`,
        location: job.location,
        workMode: job.workMode === "office" ? "Office" : "Remote",
        createdAt: moment(job.createdAt).format("DD-MM-YYYY HH:mm A"),
      }))
    : [];

  return (
    <CSVLink
      data={csvData}
      headers={headers}
      filename={"jobs.csv"}
      className="ant-btn ant-btn-default"
    >
      <Button icon={<DownloadOutlined />} type="default">
        Download CSV
      </Button>
    </CSVLink>
  );
}

export default Exportcsv;
