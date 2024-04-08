import { SetLoading } from "@/redux/loaderSlice";
import { Col, Form, Row, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MAX_COUNT = 10;

function NewJobPost() {
  // const [selectSkill, setSelectSkill] = useState<string[]>(["Node Js"]);
  const [skillData, setSkillData] = useState<any>(null);

  const dispatch = useDispatch();

  const fetchSkills = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/v1/skills");
      console.log(response, "response");

      setSkillData(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong!!!");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const suffix = (
    <>
      <span>
        {skillData && skillData.length} / {MAX_COUNT}
      </span>
      <i className="ri-arrow-down-double-line"></i>
    </>
  );
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form.Item
          label="Title"
          rules={[{ required: true, message: "Please enter a job title" }]}
          name="title"
        >
          <input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          label="Description"
          rules={[
            { required: true, message: "Please enter a job description" },
          ]}
          name="description"
        >
          <textarea />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Skills" name="skills">
          <Select
            mode="multiple"
            maxCount={MAX_COUNT}
            style={{ width: "100%" }}
            suffixIcon={suffix}
            placeholder="Please select your skills"
          >
            <option value="none" selected disabled hidden>
              Select Job Type
            </option>
            {/* {console.log(skillData, "skillData")} */}
            {skillData &&
              skillData.map((item: any) => (
                // eslint-disable-next-line react/jsx-key
                <option key={item._id} value={item.title}>
                  {item.title}
                </option>
              ))}
          </Select>
          {/* <Select
            mode="multiple"
            maxCount={MAX_COUNT}
            value={skillData}
            style={{ width: "100%" }}
            onChange={setSkillData}
            // suffixIcon={suffix}
            placeholder="Please select your skills"
            // options={skillData}
          /> */}
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Type"
          name="jobType"
          rules={[{ required: true, message: "Please enter a Job Type" }]}
        >
          <select>
            <option value="none" selected disabled hidden>
              Select Job Type
            </option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter Location" }]}
        >
          <input />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Experience"
          name="experience"
          rules={[{ required: true, message: "Please enter experience" }]}
        >
          <input type="number" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label="Work Mode"
          name="workMode"
          rules={[{ required: true, message: "Please enter work mode" }]}
        >
          <select>
            <option value="none" selected disabled hidden>
              Select Work Mode
            </option>
            <option value="remote">Remote</option>
            <option value="office">Office</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Salary From Range" name="salaryFromRange">
          <input type="number" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Salary To Range" name="salaryToRange">
          <input type="number" />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default NewJobPost;
