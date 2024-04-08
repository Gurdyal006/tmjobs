"use client";
import NewJobPost from "@/components/NewJobPost";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function NewJob() {
  const router = useRouter();

  const dispatch = useDispatch();

  const onNewJobPost = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/v1/jobs", values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Posted New Jobs" />
        <Button type="default" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Form layout="vertical" onFinish={onNewJobPost}>
        <NewJobPost />
        <div className="flex justify-end items-center my-3 gap-2">
          <Button type="default">cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewJob;
