import product from "../../utils/images/product.png";
import promo_icon from "../../utils/images/promo_icon.png";
import * as S from "./styles";

export const Card = ({ promo }) => {
  return (
    <S.CardDiv promo={promo}>
      <img src={product} alt="product-image" />
      <div className="product-info">
        <h3 className="product-title">Iphone XR 64gb</h3>
        <div className="discount-flag">
          <img src={promo_icon} alt="" />
          <p>10%</p>
        </div>
        <p className="product-category">Eletrônicos</p>
        <p className="product-oldPrice">
          <s>R$ 2199,90</s>
        </p>
        <p className="product-price">R$ 1899,90</p>
        <div className="buttons">
          <button className="btn btn-1">Comprar</button>
          <button className="btn btn-2">Carrinho</button>
        </div>
      </div>
    </S.CardDiv>
  );
};