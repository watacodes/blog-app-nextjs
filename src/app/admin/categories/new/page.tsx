import AdminSideBar from "../../_components/AdminSideBar";
import { AdminNewCategory } from "../_components/AdminNewCategory";

const Page: React.FC = () => {
  return (
    <div className="flex">
      <AdminSideBar />
      <AdminNewCategory />
    </div>
  );
};

export default Page;
