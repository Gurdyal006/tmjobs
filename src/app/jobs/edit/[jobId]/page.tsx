"use client";
import NewJobPost from "@/components/NewJobPost";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function EditJob() {
  const [jobData, setJobData] = useState<any>(null);
  const router = useRouter();

  const dispatch = useDispatch();

  const { jobId } = useParams();

  const onEditJobPost = async (values: any) => {
    try {
      values._id = jobId;
      dispatch(SetLoading(true));
      const response = await axios.put(`/api/v1/jobs/${jobId}`, values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const fetchJob = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/v1/jobs/${jobId}`);
      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    jobData && (
      <div>
        <div className="flex justify-between items-center">
          <PageTitle title="Edit Post Job" />
          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        <Form
          layout="vertical"
          onFinish={onEditJobPost}
          initialValues={jobData}
        >
          <NewJobPost />
          <div className="flex justify-end items-center my-3 gap-2">
            <Button type="default">cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default EditJob;
