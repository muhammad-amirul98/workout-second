import AddressCard from "./AddressCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useEffect } from "react";
import { fetchUserAddresses } from "../../../state/user/userSlice";

const Address = () => {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) dispatch(fetchUserAddresses(jwt));
  }, []);

  return (
    <div className="space-y-5">
      {user.addresses.map((address, index) => (
        <AddressCard key={index} address={address} />
      ))}
    </div>
  );
};

export default Address;
