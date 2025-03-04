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
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchAllProducts } from "../../../state/user/userProductSlice";
import { useSearchParams } from "react-router-dom";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const userproduct = useAppSelector((store) => store.userproduct);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSort = (event: any) => {
    setSort(event.target.value);
  };

  // HANLDE PAGE CHANGE
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const brandFilter = searchParams.getAll("brand");
    const brands = brandFilter.length > 0 ? brandFilter.join(",") : undefined;

    const newFilter = {
      brand: brands,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      pageNumber: page - 1,
    };
    dispatch(fetchAllProducts(newFilter));
  }, [searchParams, page, dispatch]);

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
            {userproduct.products.map((item, index) => {
              return <ProductCard key={index} item={item} />;
            })}
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
