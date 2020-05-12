import React from "react";
import AdminNav from "./../Components/admin/nav/AdminNav";

const AdminLayout = props => {
  return (
    <main className="main admin">
      <div className="admin-container">
        <div className="admin__left-nav">
          <AdminNav />
        </div>
        <div className="admin__right">{props.children}</div>
      </div>
    </main>
  );
};

export default AdminLayout;
