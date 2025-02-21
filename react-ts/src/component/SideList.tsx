import { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = {
  name: string;
  path: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
};

interface listProps {
  menu: MenuItem[];
  toggleList: () => void;
}

const SideList = ({ menu }: listProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r border-gray-300 py-5">
        <div>
          <div className="space-y-2">
            {menu.map((item: MenuItem, index: number) => (
              <div
                onClick={() => navigate(item.path)}
                className="pr-9 cursor-pointer"
                key={index}
              >
                <p
                  className={`${
                    item.path == location.pathname
                      ? "bg-teal-700 text-white"
                      : "text-teal-700"
                  }  rounded-r-full px-5 py-3 gap-x-3 flex text-semibold`}
                >
                  {item.path == location.pathname ? item.activeIcon : item.icon}
                  <span>{item.name}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideList;
