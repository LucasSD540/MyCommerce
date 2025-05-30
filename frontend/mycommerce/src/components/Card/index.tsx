import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { add, removeById } from "../../store/slices/cartSlice";
import { formatPrice } from "../../utils/formatPrice";
import { changeProductId } from "../../store/slices/productIdSlice";
import { useIsAuthenticatedQuery } from "../../services/authApi";
import {
  useAddFavoriteMutation,
  useListFavoriteQuery,
  useDeleteFavoriteMutation,
} from "../../services/favoriteApi";
import * as S from "./styles";

const favorite_red_outline = "/assets/images/favorite_red_outline.png";
const favorite_blue_outline = "/assets/images/favorite_blue_outline.png";
const favorite_red = "/assets/images/favorite_red.png";
const favorite_blue = "/assets/images/favorite_blue.png";
const promo_icon = "/assets/images/promo_icon.png";

export type ProductProps = {
  id: number;
  quantity: number;
  promo: boolean;
  productName: string;
  discount: string;
  old_price: number;
  price: number;
  image_url: string;
  categoryName: string;
  cardProductId: number;
};

export type ProductItem = {
  product: ProductProps;
};

export const Card = ({ product = {} as ProductProps }: ProductItem) => {
  const {
    promo = false,
    productName = "",
    discount = 0,
    old_price = 0,
    price = 0,
    image_url = "",
    categoryName = "",
    cardProductId = 0,
  } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const { data, isLoading } = useIsAuthenticatedQuery({});
  const [favoriteProduct] = useAddFavoriteMutation();
  const [favoriteRemoveProduct] = useDeleteFavoriteMutation();
  const { data: favoritesData, refetch: refetchFavorites } =
    useListFavoriteQuery({});

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isInCart = cartItems.some(
    (item) => item.product.cardProductId === product.cardProductId
  );

  const handleSetProductId = () => {
    dispatch(changeProductId(cardProductId));
  };

  useEffect(() => {
    if (favoritesData && favoritesData.length > 0) {
      const isFavorited = favoritesData.some(
        (fav: any) => fav.product === cardProductId
      );
      setFavorite(isFavorited);
    }
  }, [favoritesData, cardProductId]);

  const handleFavorite = () => {
    if (!favorite) {
      addFavorite();
    } else {
      removeFavorite();
    }
  };

  const addFavorite = async () => {
    if (!data && !isLoading) {
      navigate("/login");
    } else if (data) {
      try {
        await favoriteProduct({
          product: cardProductId,
        }).unwrap();

        setFavorite((prevFavorite) => !prevFavorite);
        refetchFavorites();
      } catch (err) {
        alert(`Não foi possível favoritar o produto: ${err}`);
      }
    }
  };

  const removeFavorite = async () => {
    try {
      await favoriteRemoveProduct(cardProductId).unwrap();

      setFavorite((prevFavorite) => !prevFavorite);
      refetchFavorites();
    } catch (err) {
      alert(`Não foi possível remover o favorito do produto: ${err}`);
    }
  };

  const addItem = () => {
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(add({ product: productWithQuantity }));
  };

  const removeItem = () => dispatch(removeById(product.cardProductId));

  return (
    <S.CardDiv promo={promo}>
      <div className="product-img-div">
        <img className="product-img" src={image_url} alt="product-image" />
        <img
          className="favorite-icon"
          src={
            promo
              ? favorite
                ? favorite_red
                : favorite_red_outline
              : favorite
              ? favorite_blue
              : favorite_blue_outline
          }
          alt="favorite-icon"
          onClick={handleFavorite}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{productName}</h3>
        {promo && (
          <div className="discount-flag">
            <img src={promo_icon} alt="" />
            <p>{discount}%</p>
          </div>
        )}
        <p className="product-category">{categoryName}</p>
        <p className="product-oldPrice">
          <s>{formatPrice(old_price)}</s>
        </p>
        <p className="product-price">{formatPrice(price)}</p>
        <div className="buttons">
          <button
            onClick={isInCart ? removeItem : addItem}
            className="btn btn-1"
          >
            {isInCart ? "Remover" : "Adicionar"}
          </button>
          <Link
            onClick={handleSetProductId}
            to={`/product-detail/${cardProductId}`}
            className="btn btn-2"
          >
            Detalhes
          </Link>
        </div>
      </div>
    </S.CardDiv>
  );
};
