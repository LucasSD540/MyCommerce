import { useFetchProductQuery } from "../../services/productApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Card } from "../Card";
import loading_card from "../../assets/images/loading_card.png";
import "./styles.css";

export const ProductCarousel = ({ categoryId }) => {
  const {
    data: productsData = [],
    isLoading,
    isError,
  } = useFetchProductQuery({});

  if (isLoading || isError) {
    return (
      <div className="loading-div">
        <img src={loading_card} alt="Carregando..." className="loading-img" />
        <img src={loading_card} alt="Carregando..." className="loading-img" />
        <img src={loading_card} alt="Carregando..." className="loading-img" />
        <img src={loading_card} alt="Carregando..." className="loading-img" />
      </div>
    );
  }

  const formatProductName = (name) => {
    return name.length > 16 ? name.slice(0, 16) + "..." : name;
  };

  const filteredProducts = productsData.filter(
    (product) => Number(product.category) === Number(categoryId)
  );

  const discountFormated = ({ old_price, price }) => {
    return (((old_price - price) / old_price) * 100).toFixed(0);
  };

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={0}
      navigation
      modules={[Navigation]}
    >
      {filteredProducts.map((product, index) => (
        <SwiperSlide key={index}>
          <Card
            key={index}
            cardProductId={product.id}
            promo={product.old_price > product.price}
            name={formatProductName(product.name)}
            discount={discountFormated({
              old_price: product.old_price,
              price: product.price,
            })}
            oldPrice={product.old_price}
            price={product.price}
            imageUrl={product.image_url}
            category={product.category.name}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
