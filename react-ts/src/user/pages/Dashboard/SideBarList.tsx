import SideList from "../../../component/SideList";
import { menu } from "./menuItems";

const SideBarList = ({ toggleList }: { toggleList: () => void }) => {
  return (
    <div>
      <SideList menu={menu} toggleList={toggleList} />
    </div>
  );
};

export default SideBarList;
