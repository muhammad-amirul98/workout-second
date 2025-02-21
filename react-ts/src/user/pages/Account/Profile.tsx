import ProfileFieldCard from "../../../component/ProfileFieldCard";

const Profile = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
        </div>
        <div>
          <ProfileFieldCard keys="Name" value="USER" />
          <ProfileFieldCard keys="Mobile" value="30389031" />
          <ProfileFieldCard keys="Email" value="aljsnd@gmail.com" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
