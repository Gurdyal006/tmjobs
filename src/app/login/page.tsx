/* eslint-disable react/no-unescaped-entities */
"use client";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Form, Radio, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/v1/users/login", values);
      message.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      {/*bg-primary */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 * 0.1 }}
        className="card p-5 w-450"
      >
        <h1 className="text-xl text-center">TMJobs-Login</h1>
        <hr />
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onSubmit}
        >
          {/* <Form.Item label="Login As" name="userType">
            <Radio.Group>
              <Radio value="employer">Employer</Radio>
              <Radio value="employee">Employee</Radio>
            </Radio.Group>
          </Form.Item> */}
          <Form.Item label="Email" name="email">
            <input type="email" className="input" placeholder="enter email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input
              type="password"
              className="input"
              placeholder="enter password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
          <div className="flex flex-row justify-between">
            <Link href="/forgotpassword">Forgot Password</Link>
            <Link href="/register">Don't have an account? Register</Link>
          </div>
        </Form>
      </motion.div>
    </div>
  );
}

export default Login;
