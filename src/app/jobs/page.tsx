"use client";
import ApplicationModal from "@/components/ApplicationModal";
import Exportcsv from "@/components/Exportcsv";
import Filters from "@/components/Filters";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import {
  CloseSquareOutlined,
  FormOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
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

  const [jobs = [], setJobs] = useState<any>(null);

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
      // setCurrentPage(page); // Update currentPage state
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

  // const downloadCsvData = () => {
  //   console.log("2222222222");

  //   <Exportcsv jobData={jobs} />;
  // };

  const tableColumns: any = [
    {
      title: "Title",
      dataIndex: "title",
      // sorter: (a: { title: string }, b: { title: string }) => {
      //   return a.title.localeCompare(b.title);
      // },
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      render: (text: any) => {
        switch (text) {
          case "full-time":
            return "Full Time";
          case "part-time":
            return "Part Time";
          case "contract":
            return "Contract";
          default:
            return text; // Return original text if it doesn't match any case
        }
      },
    },
    {
      title: "Experience",
      dataIndex: "experience",
      render: (text: any) => `${text} yrs`,
    },
    { title: "Location", dataIndex: "location" },
    {
      title: "Work Mode",
      dataIndex: "workMode",
      render: (text: any) => (text === "office" ? "Office" : "Remote"),
    },
    // { title: "Salary From Range", dataIndex: "salaryFromRange" },
    // { title: "Salary To Range", dataIndex: "salaryToRange" },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YYYY HH:mm:ss A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-2">
          <Tooltip title="Edit Job">
            <FormOutlined
              className="custom-icon-edit"
              onClick={() => router.push(`/jobs/edit/${record._id}`)}
            />
          </Tooltip>
          <Tooltip title="Delete Job">
            <CloseSquareOutlined
              className="custom-icon-remove"
              onClick={() => deleteJob(record._id)}
            />
          </Tooltip>
          <Tooltip title="Show Applications">
            <ProfileOutlined
              className="custom-icon-profile"
              onClick={() => {
                setSelectedJobs(record);
                setShowApplications(true);
              }}
            />
            {/* <i
              className="ri-file-list-3-line"
              onClick={() => {
                setSelectedJobs(record);
                setShowApplications(true);
              }}
            ></i> */}
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

        <div className="flex gap-2">
          <Button type="primary" onClick={() => router.push("/jobs/new")}>
            Create Job
          </Button>
          {jobs && jobs.length > 0 && <Exportcsv jobData={jobs} />}
        </div>
      </div>

      <div className="my-3">
        <Table
          columns={tableColumns}
          dataSource={jobs}
          // pagination={{ pageSize: 3 }}
          // pagination={{
          //   pageSize: 2,
          //   total: totalJobs,
          //   current: currentPage, // Add current page state
          //   onChange: (page) => {
          //     fetchJobs(page);
          //   },
          // }}
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
