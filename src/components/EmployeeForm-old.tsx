/* eslint-disable react/no-unescaped-entities */
import { SetLoading } from "@/redux/loaderSlice";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, Row, Col, Button, message } from "antd";
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

      {/* skills */}
      <div
        style={{
          marginTop: 35,
        }}
      >
        <h1 className="text-md">Skills</h1>
        <Form.List name="skills">
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
                      name={[name, "technology"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Technology"
                    >
                      <select style={{ width: "100%" }}>
                        <option value="none">Please select your skill</option>
                        {skillData?.map((skill: any, index: any) => (
                          <>
                            <option key={index} value={skill.title}>
                              {skill.title}
                            </option>
                          </>
                        ))}
                      </select>
                      {/* <input type="text" /> */}
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      label="Rating (Out of 10)"
                      {...restField}
                      name={[name, "rating"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                        {
                          pattern: /^(10|[1-9])$/, // Regex pattern to match numbers from 1 to 9
                          message: "Please rating from 1 to 10",
                        },
                      ]}
                      // label="Rating (Out of 10)"
                    >
                      <input type="number" pattern="^(10|[1-9])$" />
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
                  <b> Add Skill</b>
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
                      label="Role"
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
    </>
  );
}

export default EmployeeForm;
