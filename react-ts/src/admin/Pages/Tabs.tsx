import { FirstPage, GpsFixed, HelpOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";

const tabs = ["first", "second", "third"];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("first");
  return (
    <div>
      <div className="flex gap-4">
        {tabs.map((item, index) => (
          <Button
            key={index}
            onClick={() => setActiveTab(item)}
            variant={activeTab == item ? "contained" : "outlined"}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="">
        {activeTab == "first" ? (
          <IconButton>
            <FirstPage />
          </IconButton>
        ) : activeTab == "second" ? (
          <IconButton>
            <GpsFixed />
          </IconButton>
        ) : (
          <IconButton>
            <HelpOutline />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Tabs;
