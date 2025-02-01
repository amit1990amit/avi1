// import React, { useState, useEffect, useRef } from "react";

// type ProductPageProps = {
//     // isMulti?: boolean
//     // options: OptionsType[];
//     // handleChange: (data: string) => void;
//     // placeholderSearch: string
// };

// const ProductPage = ({  }: ProductPageProps) => {
//     // const [selectedOptions, setSelectedOptions] = useState<OptionsType[]>([]);
//     const [searchTerm, setSearchTerm] = useState<string>("");
//     const [isOpen, setIsOpen] = useState<boolean>(false);



//     return (
//         <></>
//     );
// };

// export default ProductPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Typography, Select, MenuItem, Button, Grid, CircularProgress, Alert } from "@mui/material";
import "../styles/global.scss"; // Import SCSS
import { fetchProductById } from "../services/api";
import Slider from "../components/Slider";
import { filterExistingVariants, generateAllAttributeCombinations, mapAttributesToVariants } from "../utils/utils";
import SelectComponent from "../components/SelectComponent";
import { colourOptions } from "../components/data";
import AddProductButton from '../components/AddProductButton'
import DropdownContainer from '../components/DropdownContainer'
import { extractVariantLabels, mapAttributesToVariantsNew } from "../utils/data";

// const fetchProduct = async (id: string) => {
//   const { data } = await axios.get("https://fedtest.bylith.com/api/catalog/get?id=");
//   return data.find((product: any) => product.id === id);
// };

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectData, setSelectData] = useState<any>(false);
    const { data, error, isSuccess, isLoading } = useQuery(["product", id], () => fetchProductById(id!),);


    useEffect(() => {
        if (isSuccess && data) {
            console.log("Variants fetched successfully:", extractVariantLabels(data));//mapAttributesToVariantsNew(data));
            // Here, you can trigger another action like setting state or filtering data
        }
    }, [isSuccess, data]);

    // onCompleted: (data) => {
    //     setToken(data.auth.access)
    //   },



    // console.log(' variants ', data?.data?.variants, data?.data?.attributes);


    // const mappedVariants = mapAttributesToVariants(data?.data?.variants, data?.data?.attributes);
    // console.log("data is iiii ", mappedVariants);

    // // Example usage
    // if (!data?.data?.variants || data?.data?.variants.length === 0 || !data?.data?.attributes || data?.data?.attributes.length === 0) {
    //     return
    // }



    // const allCombinations = generateAllAttributeCombinations(data?.data?.attributes);
    // const validCombinations = filterExistingVariants(allCombinations, data?.data?.variants, data?.data?.attributes);
    // console.log("data is validCombinations ::: ", validCombinations);

    /* eslint-disable react-hooks/rules-of-hooks */
    // useEffect(() => {
    //     if (data) {
    //         // const allCombinations = generateAllAttributeCombinations(data?.data?.attributes);
    //         // const validCombinations = filterExistingVariants(allCombinations, data?.data?.variants, data?.data?.attributes);
    //         //  console.log("data is validCombinations ::: ", validCombinations);

    //         // setSelectData(validCombinations);
    //     }
    // }, [data]);




    // useEffect(() => {
    //     if(!error && !isLoading) {
    //       console.log(' ffff ');

    //     }
    //   }, [data, error, isLoading])

    //   const [selectedColor, setSelectedColor] = useState<string | null>(null);
    //   const [selectedSize, setSelectedSize] = useState<string | null>(null);

    //   if (isLoading) return <CircularProgress />;
    //   if (error || !product) return <Alert severity="error">Product not found</Alert>;

    //   const handleColorChange = (color: string) => {
    //     setSelectedColor(color);
    //     setSelectedSize(null);
    //   };

    //   const availableSizes = selectedColor ? product.variants?.Size[selectedColor] || [] : [];

    if (isLoading) return <>Loooding....</>
    if (error) return <p>Error loading data</p>;
    return (
        <div className="product-container">
            <Slider data={data.data.images} />
            <div className="product-details-box">
                <h1 className="product-title">{data.data.title}</h1>
                <p className="product-description">{data.data.description}</p>
                <p className="product-price">{`$${data.data.min_price}`}</p>
            </div>
            {<DropdownContainer data={data.data} />}
            {/* <AddProductButton product={data.data}/> */}
            {/* <SelectComponent data={selectData} /> */}
        </div>

    );
};

export default ProductPage;

