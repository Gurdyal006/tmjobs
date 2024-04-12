/* eslint-disable react/no-unescaped-entities */
import { SetLoading } from "@/redux/loaderSlice";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, Row, Col, Button, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function EmployeeForm() {
  const [skillData, setSkillData] = useState<any>(null);

  const dispatch = useDispatch();

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

  useEffect(() => {
    fetchSkills();
  }, []);

  const MAX_COUNT = 100;
  const suffix = (
    <>
      <span>
        {skillData && skillData.length} / {MAX_COUNT}
      </span>
      <i className="ri-arrow-down-double-line"></i>
    </>
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Required" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Required" }]}
          >
            <input type="email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Required" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Carrier objectives" name="carrierObjective">
            <TextArea />
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
              {skillData &&
                skillData.map((item: any) => (
                  <option key={item._id} value={item.title}>
                    {item.title}
                  </option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {/* education */}
      <div
        style={{
          marginTop: 35,
        }}
      >
        <h1 className="text-md">Education</h1>
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row
                  key={key}
                  gutter={[16, 16]}
                  align="bottom"
                  className="my-3"
                >
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "qualification"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Qualification"
                    >
                      <select style={{ width: "100%" }}>
                        <option value="highSchool"> High School</option>
                        <option value="10+2"> 10 +2</option>
                        <option value="bachelors"> Bachelor's Degree</option>
                        <option value="masters"> Master's Degree</option>
                      </select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Institution"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "percentage"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Percentage"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>

                  <MinusCircleOutlined
                    className="custom-icon-remove m-3"
                    onClick={() => remove(name)}
                  />
                </Row>
              ))}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  <b>Add Education</b>
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* experience */}
      <div
        style={{
          marginTop: 35,
        }}
      >
        <h1 className="text-md">Experience</h1>
        <Form.List name="experience">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row
                  key={key}
                  gutter={[16, 16]}
                  align="bottom"
                  className="my-3"
                >
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "company"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Company"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "role"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Designation"
                    >
                      <input type="role" />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "period"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Period of Work"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <MinusCircleOutlined
                    className="custom-icon-remove m-3"
                    onClick={() => remove(name)}
                  />

                  {/* <i
                    className="ri-delete-bin-line"
                    onClick={() => remove(name)}
                  ></i> */}
                </Row>
              ))}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  <b> Add Experience</b>
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* project Details */}
      <div
        style={{
          marginTop: 35,
        }}
      >
        <h1 className="text-md">Add Projects</h1>
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row
                  key={key}
                  gutter={[16, 16]}
                  align="bottom"
                  className="my-3"
                >
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Name"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "role"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Role"
                    >
                      <input type="role" />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "teamSize"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Team Size"
                    >
                      <input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={20}>
                    <Form.Item
                      {...restField}
                      name={[name, "projectOverview"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Description"
                    >
                      <textarea />
                    </Form.Item>
                  </Col>
                  <MinusCircleOutlined
                    className="custom-icon-remove m-3"
                    onClick={() => remove(name)}
                  />
                </Row>
              ))}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  <b> Add Project</b>
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </>
  );
}

export default EmployeeForm;
