import React from "react";
import { Modal, Button } from "antd";
import PDFContent from "./PDFContent";
import EmployerInfo from "./EmployerInfo";
import EmployeeInfo from "./EmployeeInfo";

const PDFPreview = ({ userInfo, visible, onCancel }: any) => {
  return (
    <Modal
      title={`${
        userInfo.userType === "employer" ? "Company" : "Employee"
      } Information`}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        // <PDFContent key="preview" userInfo={userInfo} />,
      ]}
      width={800}
    >
      {userInfo && (
        <>
          {userInfo.userType === "employer" ? (
            <EmployerInfo employerInfo={userInfo} />
          ) : (
            <EmployeeInfo employeeInfo={userInfo} />
          )}
        </>
      )}
    </Modal>
  );
};

export default PDFPreview;
