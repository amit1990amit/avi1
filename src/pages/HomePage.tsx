import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { fetchAllProduct, fetchProductById } from '../services/api';
import { add3Dots, getImageByUrl } from "../utils/utils";
import { Link } from "react-router-dom";

type HomePageProps = {
    // isMulti?: boolean
    // options: OptionsType[];
    // handleChange: (data: string) => void;
    // placeholderSearch: string
};

const HomePage = ({ }: HomePageProps) => {
    // const [selectedOptions, setSelectedOptions] = useState<OptionsType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const { data: products, isLoading, isFetching, error } = useQuery(
        // ["characters", page = 1, search = ''],
        ["products"],
        () => fetchAllProduct(1),
        {
            keepPreviousData: true,
            onError: (error) => {
                console.error("Error fetching characters:", error);
            },
        },
    );

    if (isLoading) return <>Loooding....</>
    if (error) return <p>Error loading data</p>;

    console.log(' data ', products);



    return (
        <>
            <div className="main-home-contanier">
                <header className="header">
                    <h1>Products</h1>
                </header>
                <div className="product-grid">
                    {/* <div className="cards-contanier"> */}
                    {products.data && products.data.length && products.data.map((product: any) => {
                        return <Link className="product-card" key={product.id} to={`/product/${product.id}`}>
                            {/* <span className="badge new-badge">NEW</span> */}
                            {product.images && product.images.length > 0 &&
                            <img className="img" src={getImageByUrl(product.images[0].url)} alt={product.images[0].title} />}
                            <div className="product-info">
                                <div className="product-title">{product.title}</div>
                                <div className="product-price">{`$${product.min_price}`}</div>
                                <div className="product-description">{add3Dots(product.description,8)}</div>
                            </div>

                        </Link>
                    })}
                </div>
            </div>
        </>
    );
};

export default HomePage;
