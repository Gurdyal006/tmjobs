"use client";
import ApplicationModal from "@/components/ApplicationModal";
import Filters from "@/components/Filters";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Col, Input, Row, Table, Tooltip, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Jobs() {
  const { currentUser } = useSelector((state: any) => state.users);

  const [selectedJobs, setSelectedJobs] = useState<any>({});
  const [showApplications, setShowApplications] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>({
    searchText: "",
  });

  const [jobs, setJobs] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [totalJobs, setTotalJobs] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchJobs = async (page = 1) => {
    try {
      dispatch(SetLoading(true));
      const params = {
        searchText: filters.searchText,
        pageSize,
        page,
      };

      const response = await axios.get(`/api/v1/jobs?user=${currentUser._id}`, {
        params: params,
      });

      setJobs(response.data.data);
      setTotalJobs(response.data.total);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }

    // try {
    //   dispatch(SetLoading(true));
    //   const response = await axios.get(`/api/v1/jobs?user=${currentUser._id}`);
    //   setJobs(response.data.data);
    // } catch (error: any) {
    //   message.error(error.response.data.message || "something went wrong!!!");
    // } finally {
    //   dispatch(SetLoading(false));
    // }
  };

  const deleteJob = async (jobId: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/v1/jobs/${jobId}`);
      message.success(response.data.message);
      fetchJobs();
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const handleReset = async () => {
    const params = {
      searchText: "",
    };

    const response = await axios.get("/api/v1/jobs", {
      params: params,
    });

    setJobs(response.data.data);
    setFilters({ searchText: "" });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const tableColumns: any = [
    { title: "Title", dataIndex: "title" },
    { title: "Job Type", dataIndex: "jobType" },
    { title: "Experience", dataIndex: "experience" },
    { title: "Location", dataIndex: "location" },
    { title: "Work Mode", dataIndex: "workMode" },
    // { title: "Salary From Range", dataIndex: "salaryFromRange" },
    // { title: "Salary To Range", dataIndex: "salaryToRange" },
    {
      title: "Posted On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YYYY HH:mm:ss A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-2">
          <Tooltip title="Edit Job">
            <i
              className="ri-edit-circle-fill"
              onClick={() => router.push(`/jobs/edit/${record._id}`)}
            ></i>
          </Tooltip>
          <Tooltip title="Delete Job">
            <i
              className="ri-delete-bin-6-line"
              onClick={() => deleteJob(record._id)}
            ></i>
          </Tooltip>
          <Tooltip title="Show Applications">
            <i
              className="ri-file-list-3-line"
              onClick={() => {
                setSelectedJobs(record);
                setShowApplications(true);
              }}
            ></i>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle title="Listing Jobs" />
        <div className="flex gap-4">
          <Filters
            filters={filters}
            setFilters={setFilters}
            getData={fetchJobs}
            handleReset={handleReset}
          />
        </div>

        <Button type="primary" onClick={() => router.push("/jobs/new")}>
          New Job
        </Button>
      </div>

      <div className="my-3">
        <Table
          columns={tableColumns}
          dataSource={jobs}
          // pagination={{ pageSize: 3 }}
        />
      </div>

      {showApplications && (
        <ApplicationModal
          selectedJobs={selectedJobs}
          showApplications={showApplications}
          setShowApplications={setShowApplications}
        />
      )}
    </>
  );
}

export default Jobs;
