"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button, Divider, message } from "antd";
import PageTitle from "@/components/PageTitle";
import EmployerInfo from "@/components/EmployerInfo";
import EmployeeInfo from "@/components/EmployeeInfo";
import { SetLoading } from "@/redux/loaderSlice";
import PDFContent from "@/components/PDFContent";
import PDFPreview from "@/components/PDFPreview";

function UserInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  // const [previewVisible, setPreviewVisible] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchUserInfo = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/v1/users/${userId}`);
      setUserInfo(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // const handlePreview = () => {
  //   setPreviewVisible(true);
  // };

  // const handleClosePreview = () => {
  //   setPreviewVisible(false);
  // };

  return (
    userInfo && (
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <PageTitle
              title={`${
                userInfo.userType === "employer" ? "Company" : "Employee"
              } Information`}
            />
          </div>

          <div className="flex gap-2">
            <Button type="default" onClick={() => router.back()}>
              Back
            </Button>
            {/* <Button type="default" onClick={handlePreview}>
              Preview
            </Button> */}
            {userInfo.userType === "employee" ? (
              <PDFContent userInfo={userInfo} />
            ) : (
              ""
            )}
          </div>
        </div>

        {userInfo.userType === "employer" ? (
          <EmployerInfo employerInfo={userInfo} />
        ) : (
          <EmployeeInfo employeeInfo={userInfo} />
        )}
        {/* Render PDF Preview Modal */}
        {/* <PDFPreview
          userInfo={userInfo}
          visible={previewVisible}
          onCancel={handleClosePreview}
        /> */}
      </div>
    )
  );
}

export default UserInfo;
