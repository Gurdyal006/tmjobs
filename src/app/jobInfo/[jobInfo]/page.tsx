"use client";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Col, Divider, Form, Row, message } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function JobInfo() {
  const { currentUser } = useSelector((state: any) => state.users);

  const [jobData, setJobData] = useState<any>(null);

  const [applications = [], setApplications] = useState<any[]>([]);

  const router = useRouter();

  const dispatch = useDispatch();

  const params = useParams();
  //   console.log(params?.jobInfo, "params");

  const fetchJob = async () => {
    try {
      dispatch(SetLoading(true));

      const response = await axios.get(`/api/v1/jobs/${params?.jobInfo}`);

      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  // application apply only one time
  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));

      const response = await axios.get(
        `/api/v1/applications?job=${params?.jobInfo}&user=${currentUser._id}`
      );

      console.log(response, "response");

      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onApplicationApply = async () => {
    try {
      SetLoading(true);
      const response = await axios.post("/api/v1/applications", {
        job: jobData._id,
        user: currentUser._id,
        status: "Pending",
      });
      message.success(response.data.message);
    } catch (error: any) {
      message.error(error.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
    fetchApplications();
  }, []);

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row gutter={[16, 16]}>
          <Col span={12} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Company</span>
              <span>{jobData.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{jobData.location}</span>
            </div>

            <div className="flex justify-between">
              <span>Salary</span>
              <span>
                {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
              </span>
            </div>

            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{jobData.workMode}</span>
            </div>

            <div className="flex justify-between">
              <span>Jop Type</span>
              <span>{jobData.jobType}</span>
            </div>

            <div className="flex justify-between">
              <span>Experience Required</span>
              <span>{jobData.experience} Years</span>
            </div>
          </Col>
          <Col span={24} className="">
            <h1 className="text-md">
              <span>Description</span>
              <Divider />
              <span>{jobData.description}</span>
              {applications.length > 0 && (
                <span className="flex flex-col gap-2 card  my-2 p-3 info text-center">
                  You already applied this job. Employer respond you soon.
                </span>
              )}
            </h1>
            <div className="flex justify-end gap-2">
              <Button type="default" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="default"
                onClick={() => router.push(`/userInfo/${jobData.user._id}`)}
              >
                View Company Info
              </Button>
              <Button
                type="primary"
                onClick={onApplicationApply}
                disabled={
                  currentUser.userType === "employer" || applications.length > 0
                }
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default JobInfo;
