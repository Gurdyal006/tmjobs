import { Col, Form, Row } from "antd";

function SkillsForm() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Form.Item
          label="Title"
          rules={[{ required: true, message: "Please enter a job skill" }]}
          name="title"
        >
          <input />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default SkillsForm;
