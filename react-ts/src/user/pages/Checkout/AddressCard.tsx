import { IconButton, Radio } from "@mui/material";
import { useAppDispatch } from "../../../state/store";
import {
  deleteAddress,
  fetchUserAddresses,
} from "../../../state/user/userSlice";
import { useEffect } from "react";
import { Address } from "../../../types/UserTypes";
import { Delete, Edit } from "@mui/icons-material";

const AddressCard = ({
  address,
  selected,
  handleSelect,
}: {
  address: Address;
  selected: string | null;
  handleSelect: (addressId: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleDelete = () => {
    if (address.id && jwt) {
      dispatch(deleteAddress({ addressId: address.id, jwt }));
      window.location.reload();
    }
  };

  const handleEdit = () => {};

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserAddresses(jwt));
    } else {
      console.error("JWT not found, unable to fetch user addresses");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelect(e.target.value);
  };
  return (
    <div className="border rounded-md border-gray-300 flex px-5 py-5 relative">
      <div className="px-5 py-5">
        <Radio
          onChange={handleChange}
          value={address.id}
          name="radio"
          checked={selected === String(address.id)}
        />
      </div>
      <div className="space-y-4">
        <p>Country: {address.country}</p>
        <p>Street: {address.street}</p>
        <p>Zip: {address.zip}</p>
      </div>
      <div className="absolute top-2 right-2">
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </div>
    </div>
  );
};

export default AddressCard;
