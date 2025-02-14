import { Radio } from "@mui/material";

const AddressCard = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div className="border rounded-md border-gray-300 flex px-5 py-5">
      <div className="px-5 py-5">
        <Radio checked={true} onChange={handleChange} value="" name="radio" />
      </div>
      <div className="space-y-4">
        <h1>User</h1>
        <p>123 Elm Street, Springfield, IL 62701, USA</p>
        <p>(555) 123-4567</p>
      </div>
    </div>
  );
};

export default AddressCard;
