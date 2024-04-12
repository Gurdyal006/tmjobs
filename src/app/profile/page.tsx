"use client";

// import EmployeeForm from "@/components/EmployeeForm";
// import EmployerForm from "@/components/EmployerForm";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { SetCurrentUser } from "@/redux/usersSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

const EmployeeForm = dynamic(() => import("@/components/EmployeeForm"), {
  ssr: false, // This ensures that EmployeeForm is not included during server-side rendering
});

const EmployerForm = dynamic(() => import("@/components/EmployerForm"), {
  ssr: false, // This ensures that EmployerForm is not included during server-side rendering
});

function Profile() {
  const { currentUser } = useSelector((state: any) => state.users);

  const dispatch = useDispatch();

  const onUpdateUser = async (values: any) => {
    try {
      values._id = currentUser._id;
      values.userType = currentUser.userType;

      dispatch(SetLoading(true));
      const response = await axios.put("/api/v1/users", values);

      message.success("user update successfully");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <PageTitle title="Profile" />
      <Form
        layout="vertical"
        initialValues={currentUser}
        onFinish={onUpdateUser}
      >
        {typeof document !== "undefined" &&
        currentUser?.userType === "employer" ? (
          <EmployerForm />
        ) : (
          <EmployeeForm />
        )}
        <div className="flex justify-end my-3">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
