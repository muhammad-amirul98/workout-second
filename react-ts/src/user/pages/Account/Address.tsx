import AddressCard from "./AddressCard";

const Address = () => {
  return (
    <div className="space-y-5">
      {[1, 1, 1, 1].map((_, index) => (
        <AddressCard key={index} />
      ))}
    </div>
  );
};

export default Address;
