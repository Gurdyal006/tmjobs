// import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EmployerForm() {
  // Define modules with custom toolbar options
  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     [{ font: [] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       // { indent: "-1" },
  //       // { indent: "+1" },
  //     ],
  //     ["link", "image", "video"],
  //     ["clean"],
  //   ],
  // };

  return (
    <>
      <Row gutter={[16, 16]}>
        {/* <Col span={8}>
          <Form.Item
            label="Upload Logo"
            name="avatar"
            rules={[{ required: true, message: "Please Upload Logo" }]}
          >
            <Upload
              accept="image/*"
              beforeUpload={() => false} // Disable default file upload behavior
              maxCount={1} // Limit to one file
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col> */}

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

        <Col span={8}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please Enter City " }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please Enter State name" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Pin code"
            name="pinCode"
            rules={[
              { required: true, message: "Please Enter PinCode" },
              // {
              //   pattern: /^[0-9]+$/,
              //   message: "Please Enter Only Numbers",
              // },
            ]}
          >
            <input type="text" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please Enter nationality" }]}
          >
            <select>
              <option value="IN">India</option>
              <option value="US">USA</option>
              <option value="CA">Canada</option>
              <option value="AS">Australia</option>
            </select>
          </Form.Item>
        </Col>
        {/* <Col span={24}>
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: "Please Enter Company About" }]}
          >
            <ReactQuill modules={modules} />
          </Form.Item>
        </Col> */}

        <Col span={24}>
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: "Please Enter Company About" }]}
          >
            <TextArea
              placeholder="About Company"
              style={{ height: 150 }}
              // style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default EmployerForm;
