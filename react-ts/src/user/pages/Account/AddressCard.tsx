import { useAppSelector } from "../../../state/store";

const AddressCard = () => {
  const { auth } = useAppSelector((store) => store);
  return (
    <div className="border rounded-md border-gray-300 flex px-5 py-5">
      <div className="space-y-4">
        <h1>{auth.user?.fullName}</h1>
        <p>123 Elm Street, Springfield, IL 62701, USA</p>
        <p>(555) 123-4567</p>
      </div>
    </div>
  );
};

export default AddressCard;
