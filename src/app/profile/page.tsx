"use client";

import EmployeeForm from "@/components/EmployeeForm";
import EmployerForm from "@/components/EmployerForm";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loaderSlice";
import { SetCurrentUser } from "@/redux/usersSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state: any) => state.users);

  const dispatch = useDispatch();

  const onUpdateUser = async (values: any) => {
    try {
      // Retrieve the file object from the form data
      const avatarFile = values.avatar[0].originFileObj;
      // Create a new FormData object to include the file
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      // Append other form values to the FormData object
      formData.append("_id", currentUser._id);
      formData.append("userType", currentUser.userType);
      formData.append("avatar", currentUser.avatar);
      // Make sure to set the Content-Type header to undefined, allowing the browser to set it automatically
      const config = { headers: { "Content-Type": undefined } };

      dispatch(SetLoading(true));
      // Use axios.post instead of axios.put since we're sending FormData
      const response = await axios.post("/api/v1/users", formData, config);
      console.log(response, "response");

      message.success("user update successfully");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  // const onUpdateUser = async (values: any) => {
  //   try {
  //     values._id = currentUser._id;
  //     values.userType = currentUser.userType;
  //     values.avatar = currentUser.avatar;

  //     dispatch(SetLoading(true));
  //     const response = await axios.put("/api/v1/users", values);
  //     console.log(response, "responseprrrrrrr");

  //     message.success("user update successfully");
  //     dispatch(SetCurrentUser(response.data.data));
  //   } catch (error: any) {
  //     message.error(error.response.data.message);
  //   } finally {
  //     dispatch(SetLoading(false));
  //   }
  // };

  return (
    <div>
      <PageTitle title="Profile" />
      <Form
        layout="vertical"
        initialValues={currentUser}
        onFinish={onUpdateUser}
      >
        {currentUser?.userType === "employer" ? (
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
