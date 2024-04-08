"use client";
import PageTitle from "@/components/PageTitle";
import SkillsForm from "@/components/SkillsForm";
import { SetLoading } from "@/redux/loaderSlice";
import { Button, Col, Form, Row, Table, message } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Technologies() {
  const [skillData, setSkillData] = useState<any>(null);

  const dispatch = useDispatch();

  //   const { skillId } = useParams();

  const onAddSkills = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/v1/skills", values);
      message.success(response.data.message);
      fetchSkills();
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const fetchSkills = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/v1/skills");

      setSkillData(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const deleteSkill = async (skillId: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/v1/skills/${skillId}`);

      message.success(response.data.message);
      fetchSkills();
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const skillsColumns = [
    { title: "Title", dataIndex: "title" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-2">
          {/* <i className="ri-edit-circle-fill"></i> */}
          <i
            className="ri-delete-bin-6-line"
            onClick={() => deleteSkill(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title="Skills" />
      <div className="my-2">
        <Form layout="vertical" onFinish={onAddSkills}>
          <SkillsForm />
          <div className="my-3">
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </Form>
      </div>
      <PageTitle title="Listings" />
      <Row>
        <Col span={10}>
          <Table
            columns={skillsColumns}
            dataSource={skillData}
            scroll={{ y: 300 }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Technologies;
