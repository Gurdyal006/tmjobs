import { Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

function EmployerForm() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please Enter Company Name" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please Enter Company Email" }]}
          >
            <input type="email" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please Enter Company Phone" },
              {
                pattern: /^[0-9]+$/,
                message: "Please Enter Only Numbers",
              },
            ]}
          >
            <input type="tel" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Est Year"
            name="establishmentYear"
            rules={[
              {
                required: true,
                message: "Please Enter Company Establish year",
              },
            ]}
          >
            <input type="number" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Website"
            name="website"
            rules={[
              { required: true, message: "Please Enter Company Website" },
            ]}
          >
            <input type="text" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="No Of Employees"
            name="companySize"
            rules={[{ required: true, message: "Please Enter Company Size" }]}
          >
            <input type="number" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: "Please Enter Company About" }]}
          >
            <TextArea />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please Enter Company Address" },
            ]}
          >
            <textarea />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default EmployerForm;
