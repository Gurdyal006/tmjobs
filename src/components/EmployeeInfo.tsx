import { Col, Divider, Row, Table } from "antd";

function EmployeeInfo({ employeeInfo }: { employeeInfo: any }) {
  const EducationColumns = [
    {
      title: "Qualification",
      dataIndex: "qualification",
    },
    {
      title: "Institution",
      dataIndex: "institution",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
    },
  ];

  const skillsColumns = [
    {
      title: "Technology",
      dataIndex: "technology",
    },
    {
      title: "Rating (Out of 10)",
      dataIndex: "rating",
    },
  ];

  const experienceColumns = [
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Period (from - to) yrs",
      dataIndex: "period",
      render: (text: any) => `${text} yrs`,
    },
  ];

  return (
    <Row>
      <Col span={12}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>Name</span>
            <span>{employeeInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Email</span>
            <span>{employeeInfo.email}</span>
          </div>

          <div className="flex justify-between">
            <span>Phone</span>
            <span>{employeeInfo.phone}</span>
          </div>
        </div>
      </Col>

      <Col span={24} className="my-3">
        <h1 className="text-md">
          <b>Carrier Objective</b>
        </h1>
        <span>{employeeInfo.carrierObjective}</span>
      </Col>

      <Col span={24} className="my-3">
        <h1 className="text-md">
          <b>Education</b>
        </h1>
        <Table
          columns={EducationColumns}
          dataSource={employeeInfo.education}
          pagination={false}
        />
      </Col>

      <Col span={24} className="my-3">
        <h1 className="text-md">
          <b>Skills</b>
        </h1>
        <Table
          columns={skillsColumns}
          dataSource={employeeInfo.skills}
          pagination={false}
        />
      </Col>

      <Col span={24} className="my-3">
        <h1 className="text-md">
          <b>Experience</b>
        </h1>
        <Table
          columns={experienceColumns}
          dataSource={employeeInfo.experience}
          pagination={false}
        />
      </Col>
    </Row>
  );
}

export default EmployeeInfo;
