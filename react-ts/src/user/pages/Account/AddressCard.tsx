import { useAppSelector } from "../../../state/store";
import { Address } from "../../../types/UserTypes";

const AddressCard = ({ address }: { address: Address }) => {
  const auth = useAppSelector((store) => store.auth);
  return (
    <div className="border rounded-md border-gray-300 flex px-5 py-5">
      <div className="space-y-4">
        <h1>{auth.user?.fullName}</h1>
        <p>
          <strong>Country: </strong>
          {address.country}
        </p>
        <p>
          <strong>Street: </strong>
          {address.street}
        </p>
        <p>
          <strong>Zip: </strong>
          {address.zip}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
