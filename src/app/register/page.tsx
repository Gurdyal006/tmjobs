"use client";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Form, Radio, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (values: any) => {
    // console.log(values);

    // fetch register api
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/v1/users/register", values);
      message.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="card p-5 w-450">
        <h1 className="text-xl">TMJobs-Register</h1>
        <hr />
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onSubmit}
        >
          <Form.Item label="Register As" name="userType">
            <Radio.Group>
              <Radio value="employer">Employer</Radio>
              <Radio value="employee">Employee</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Name" name="name">
            <input type="text" className="input" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input type="email" className="input" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
          <Link href="/login">Already have an account? Login</Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
