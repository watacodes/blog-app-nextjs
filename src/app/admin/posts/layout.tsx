"use client";

const AdminPostListLayout: React.FC = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-col w-full p-4">{children}</div>;
};

export default AdminPostListLayout;
