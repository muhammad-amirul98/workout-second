import { Divider } from "@mui/material";

const ProfileFieldCard = ({ keys, value }: { keys: string; value: string }) => {
  return (
    <>
      <div className="p-5 flex items-center bg-slate-50 rounded-md">
        <p className="w-15 lg:w-25">{keys}</p>
        <Divider orientation="vertical" flexItem />
        <p className="pl-3 lg:pl-10 font-semibold">{value}</p>
      </div>
    </>
  );
};

export default ProfileFieldCard;
