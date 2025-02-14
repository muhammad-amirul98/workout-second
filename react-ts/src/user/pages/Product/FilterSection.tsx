import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { brands } from "../../data/brand.ts";
import { prices } from "../../data/price.ts";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { CheckBox } from "@mui/icons-material";

const FilterSection = () => {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [expandBrand, setExpandBrand] = useState(false);
  const handleExpandBrand = () => {
    setExpandBrand(!expandBrand);
  };

  //Filter Params
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedPrice(value);

    // Update the searchParams for the price
    searchParams.set("price", value);
    setSearchParams(searchParams); // Update the searchParams with the new price value
  };

  const clearAllFilters = () => {
    setSelectedPrice(null);
    setSelectedBrands([]);
    // searchParams.forEach((_, key) => {
    //   searchParams.delete(key);
    // });
    // setSearchParams(searchParams);
    setSearchParams(new URLSearchParams());
  };

  //Selected Brands for checkbox check
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedBrands((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((item) => item !== value)
    );

    if (checked) {
      // Add the brand to searchParams
      searchParams.append("brand", value);
    } else {
      // Remove the brand from searchParams
      const currentParams = searchParams.getAll("brand");
      const updatedParams = currentParams.filter((brand) => brand !== value);
      searchParams.delete("brand");
      updatedParams.forEach((brand) => searchParams.append("brand", brand));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="-z-50">
      <div className="flex items-center justify-between h-[60px] px-9 lg:border-r border-gray-300">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={clearAllFilters}
          className="cursor-pointer font-semibold"
        >
          Clear All
        </Button>
      </div>

      <Divider />

      {/* BRAND */}

      <div className="px-9 space-y-6 mt-6 mb-6">
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[600],
                mb: 2,
              }} // Using MUI margin-bottom
              className="text-2xl font-semibold text-teal-600 mb-4" // Tailwind styles
              id="brand"
            >
              Brand
            </FormLabel>
            <FormGroup
              aria-labelledby="brand"
              defaultValue=""
              // name="brand"
              onChange={handleCheckboxChange}
            >
              {brands.slice(0, expandBrand ? brands.length : 5).map((brand) => (
                <FormControlLabel
                  key={brand.name}
                  value={brand.value}
                  control={
                    <Checkbox checked={selectedBrands.includes(brand.value)} />
                  }
                  label={brand.name}
                />
              ))}
            </FormGroup>
          </FormControl>
          <div>
            <Button onClick={handleExpandBrand}>
              {expandBrand ? "hide" : `+ ${brands.length - 5} more`}
            </Button>
          </div>
        </section>
      </div>

      <Divider />

      {/* PRICE */}
      <div className="px-9 space-y-6 mt-6">
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[600],
                mb: 2,
              }} // Using MUI margin-bottom
              className="text-2xl font-semibold text-teal-600 mb-4" // Tailwind styles
              id="brand"
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="price"
              defaultValue=""
              name="price"
              value={searchParams.get("price") || ""}
              onChange={handlePriceChange}
            >
              {prices.map((price) => (
                <FormControlLabel
                  key={price.name}
                  value={price.value}
                  control={<Radio />}
                  label={price.name}
                  checked={selectedPrice === price.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
