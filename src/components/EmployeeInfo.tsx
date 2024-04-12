import { Card, Col, Divider, Row, Table, Tag } from "antd";

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
      <style>
        {`
        
          .custom-table .ant-table-thead > tr > th {
            background-color: #000000;
            color: #ffffff
          }
        `}
      </style>
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
          <b>Skills</b>
        </h1>
        <div>
          {employeeInfo.skills.map((skill: string, index: number) => (
            <Tag key={index} color="green">
              {skill}
            </Tag>
          ))}
        </div>
      </Col>

      <Col span={24} className="my-3">
        <h1 className="text-md">
          <b>Education</b>
        </h1>
        <Table
          columns={EducationColumns}
          dataSource={employeeInfo.education}
          pagination={false}
          // className="custom-table"
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
          // className="custom-table"
        />
      </Col>
      <Col span={24} className="my-3">
        <h1 className="text-md">
          <b>Projects</b>
        </h1>
        <Row gutter={[16, 16]}>
          {employeeInfo.projects.map((project: any, index: number) => (
            <Col key={index} span={24}>
              <Card title={project.name} style={{ width: "100%" }}>
                <p>
                  <b>Role:</b> {project.role}
                </p>
                <p>
                  <b>Team Size:</b> {project.teamSize}
                </p>
                <p>
                  <b>Project Overview:</b> {project.projectOverview}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default EmployeeInfo;
