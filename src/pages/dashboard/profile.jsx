import React from "react";
import Breadcrumb from "../../components/common/breadcrumb";

const Profile = () => {
  return (
    <>
      <Breadcrumb paths={[{ label: "profile", path: "/admin/profile" }]} />

      <h1 className="text-2xl font-bold mb-4 text-primary">Profile</h1>
    </>
  );
};

export default Profile;
