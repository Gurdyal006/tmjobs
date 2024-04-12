import { Col, Form, Row, Button } from "antd";

function SkillsForm({ onAddSkills }: any) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form layout="vertical" onFinish={onAddSkills}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Form.Item
                label="Title"
                rules={[
                  { required: true, message: "Please enter a job skill" },
                ]}
                name="title"
              >
                <input />
              </Form.Item>
            </div>
            <div className="my-3">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default SkillsForm;
