import ProfileFieldCard from "../../../component/ProfileFieldCard";
import { useAppSelector } from "../../../state/store";

const Profile = () => {
  const auth = useAppSelector((store) => store.auth);
  console.log(auth.user);
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
        </div>
        <div>
          <ProfileFieldCard keys="Name" value={auth.user?.fullName || ""} />
          <ProfileFieldCard keys="Mobile" value={auth.user?.mobile || ""} />
          <ProfileFieldCard keys="Email" value={auth.user?.email || ""} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
