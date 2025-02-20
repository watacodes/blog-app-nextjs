"use client";

const AdminCategoryLayout: React.FC = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-col w-full">{children}</div>;
};

export default AdminCategoryLayout;
