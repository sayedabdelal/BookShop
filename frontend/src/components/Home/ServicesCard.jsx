// Home Component
function ServicesCard({iconClass, title, description }) {
    
    return (
        <article className="services__card">
            <i className={iconClass} />
            <h3 className="services__title">{title}</h3>
            <p className="services__description">{description}</p>
        </article>
    )
  }

export  default ServicesCard;