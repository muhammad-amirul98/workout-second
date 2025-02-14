import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import { FilterAlt } from "@mui/icons-material";
import { useState } from "react";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [, setPage] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSort = (event: any) => {
    setSort(event.target.value);
  };

  // HANLDE PAGE CHANGE
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
    <div className="-z-10 mt-10">
      {/* TITLE  */}
      <div>
        <h1 className="text-3xl text-center font-bold logo pb-5 px-9 uppercase space-x-2">
          Supplements
        </h1>
      </div>

      <div className="lg:flex">
        {/* FILTER */}
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        {/* SUPPLEMENTS */}
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            {/* SORT BAR  */}
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSort}
              >
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />

          {/* PRODUCTS  */}
          <section className="product_section mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {[1, 1, 1, 1, 1, 1].map((_, index) => (
              <ProductCard key={index} />
            ))}
          </section>

          {/* PAGINATION */}
          <div className="flex justify-center py-10">
            <Pagination
              onChange={(_, value) => handlePageChange(value)}
              count={10}
              shape="rounded"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
