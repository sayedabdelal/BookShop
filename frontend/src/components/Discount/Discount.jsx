
import discountImg1 from "../../assets/img/discount-book-1.png"
import discountImg2 from "../../assets/img/discount-book-2.png"
import "./Discount.css"


function DataDiscount() { 
    return (
        <div className="discount__data">
            <h2 className="section__title discount__title">Up To 50% Discount</h2>
            <p className="discount__description">
                Take advantage of the discount days we have for you, buy books from your
                favorite writers, the more you buy, the more discounts we have for you.
            </p>
            <a href="#" className="button">
                Shop Now
            </a>
        </div>
        
    )
}
// Component for displaying discount images
function DiscountImages({ imgSrc1, imgSrc2 }) {
    return (
      <div className="discount__images">
        <img src={imgSrc1} alt="Discount Image 1" className="discount__img-1" />
        <img src={imgSrc2} alt="Discount Image 2" className="discount__img-2" />
      </div>
    );
  }

  function DiscountContainer({ imgSrc1, imgSrc2 }) { 
    return (
        <section className="discount section" id="discount">
            <div className="discount__container container grid">
                <DataDiscount />
                <DiscountImages imgSrc1={imgSrc1} imgSrc2={imgSrc2} />
            </div>
        </section>
    )
}




function Discount() {
  return (
    <>
        <DiscountContainer 
            imgSrc1={discountImg1} 
            imgSrc2={discountImg2} 
        />
    </>
  )
}

export default Discount