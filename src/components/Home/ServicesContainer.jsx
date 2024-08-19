import ServicesCard from "./ServicesCard"

// ServicesTitle Component
function ServicesContainer() {
    return (
      <section className="services section">
        <div className="services__container container grid">
          <ServicesCard 
            iconClass="ri-truck-line" 
            title="Free Shipping" 
            description="Order More Than $100" 
          />
  
          <ServicesCard 
            iconClass="ri-lock-2-line" 
            title="Secure Payment" 
            description="100% Secure Payment" 
          />
          <ServicesCard 
            iconClass="ri-customer-service-2-line" 
            title="24/7 Support" 
            description="Call us anytime" 
          />
  
        </div>
      </section>
    )
  }
export default ServicesContainer;