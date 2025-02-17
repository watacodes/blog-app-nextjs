"use client";

const AdminPostListLayout: React.FC = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex h-full w-full">{children}</div>;
};

export default AdminPostListLayout;
