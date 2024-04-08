"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button, message } from "antd";
import PageTitle from "@/components/PageTitle";
import EmployerInfo from "@/components/EmployerInfo";
import EmployeeInfo from "@/components/EmployeeInfo";
import { SetLoading } from "@/redux/loaderSlice";

function UserInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
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

  return (
    userInfo && (
      <div>
        <div className="flex justify-between items-center">
          <PageTitle
            title={`${
              userInfo.userType === "employer" ? "Company " : "Employee"
            } Information`}
          />

          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        {userInfo.userType === "employer" ? (
          <EmployerInfo employerInfo={userInfo} />
        ) : (
          <EmployeeInfo employeeInfo={userInfo} />
        )}
      </div>
    )
  );
}

export default UserInfo;
