import React from "react";
import "./ProductCard.css";

interface ProductCardData {
  id: number;
  productName: string;
  price: number;
  image: string;
}

type ProductCardProps = {
  data: ProductCardData;
  className?: string;
  onClick?: any;
};

const ProductCard = (property: ProductCardProps) => {
  const { data } = property;
  const { productName, price, image } = data;
  return (
    <div className="card-container m-2">
      <img src={image} alt="" className="card-image" />
      <div>
        <div className="subtitle-md mb-1 mt-2">{productName}</div>
        <div className="content-sm">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(price)}
        </div>
      </div>
    </div>
  );
  //   }
};

export default ProductCard;
