"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Pagination, Row, message } from "antd";
import axios from "axios";
import { motion } from "framer-motion";

import Divider from "@/components/Divider";
import { useRouter } from "next/navigation";
import { SetLoading } from "@/redux/loaderSlice";
import PageTitle from "@/components/PageTitle";
import Filters from "@/components/Filters";

interface Job {
  _id: string;
  // Define other properties of Job
}

function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<any>({
    searchText: "",
    location: "",
  });

  const [applicantsCount, setApplicantsCount] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of items per page

  const fetchJobs = async (page = 1) => {
    try {
      dispatch(SetLoading(true));
      const params = {
        searchText: filters.searchText,
        location: filters.location,
        pageSize,
        page,
      };

      const response = await axios.get("/api/v1/jobs", {
        params: params,
      });

      setJobs(response.data.data);
      setTotalJobs(response.data.total);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    fetchJobs((page = 1));
  };

  const handleReset = async () => {
    const params = {
      searchText: "",
      location: "",
    };

    const response = await axios.get("/api/v1/jobs", {
      params: params,
    });

    setJobs(response.data.data);
    setFilters({ searchText: "", location: "" });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <PageTitle title="DashBoard" />

      {jobs.length > 0 && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          getData={fetchJobs}
          handleReset={handleReset}
        />
      )}

      <Row gutter={[16, 16]}>
        {jobs.map((job: any) => (
          <Col
            span={8}
            className="p-2"
            key={job._id}
            onClick={() => router.push(`/jobInfo/${job._id}`)}
          >
            <motion.div
              className="card flex flex-col gap-2 cursor-pointer p-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.h1
                className="text-md"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.1 }}
              >
                {job.title}
              </motion.h1>

              <Divider />

              <motion.div
                className="flex justify-between"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.1 }}
              >
                <span>Company</span>
                <span>{job.user.name}</span>
              </motion.div>
              <motion.div
                className="flex justify-between"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.1 }}
              >
                <span>Location</span>
                <span>{job.location}</span>
              </motion.div>

              <motion.div
                className="flex justify-between"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.1 }}
              >
                <span>Salary</span>
                <span>
                  {job.salaryFromRange} LPA - {job.salaryToRange} LPA
                </span>
              </motion.div>

              <motion.div
                className="flex justify-between"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.1 }}
              >
                <span>Work Mode</span>
                <span>{job.workMode}</span>
              </motion.div>
            </motion.div>
          </Col>
        ))}
      </Row>

      {jobs.length > 0 && (
        <Pagination
          className=" flex justify-end my-3"
          current={currentPage}
          total={totalJobs}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      )}
    </div>
  );
}

export default Home;
