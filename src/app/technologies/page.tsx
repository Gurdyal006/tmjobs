"use client";
import PageTitle from "@/components/PageTitle";
import SkillsForm from "@/components/SkillsForm";
import { SetLoading } from "@/redux/loaderSlice";
import { CloseSquareOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Table, message } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Technologies() {
  const [skillData, setSkillData] = useState<any>(null);
  const [newSkillTitle, setNewSkillTitle] = useState<string>("");

  const dispatch = useDispatch();

  //   const { skillId } = useParams();

  const onAddSkills = async () => {
    if (!newSkillTitle.trim()) {
      message.error("Please enter a skill title");
      return;
    }
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/v1/skills", {
        title: newSkillTitle,
      });
      message.success(response.data.message);
      fetchSkills();
      setNewSkillTitle("");
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
          <CloseSquareOutlined
            className="custom-icon-remove"
            onClick={() => deleteSkill(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title="Skills" />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          {/* <SkillsForm onAddSkills={onAddSkills} /> */}
          <Form.Item>
            <Input
              value={newSkillTitle}
              onChange={(e) => setNewSkillTitle(e.target.value)}
              placeholder="Enter Skill Title"
            />
          </Form.Item>
          <Form.Item className="my-3 text-right">
            <Button type="primary" onClick={onAddSkills}>
              Add Skill
            </Button>
          </Form.Item>
        </Col>
        <Col span={16}>
          {/* <PageTitle title="Listings" /> */}
          <Table
            columns={skillsColumns}
            dataSource={skillData}
            // scroll={{ y: 300 }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Technologies;
