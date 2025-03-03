import { adminMenu } from "../data/adminMenu";
import SideList from "../../component/SideList";

const AdminSidebarList = ({ toggleList }: { toggleList: () => void }) => {
  return (
    <div>
      <SideList menu={adminMenu} toggleList={toggleList} />
    </div>
  );
};

export default AdminSidebarList;
