import './Footer.css'

function Footer() {
  return (
    <>
    <footer className="footer">
  <div className="footer__container container grid">
    <div>
      <a href="#" className="footer__logo">
        <i className="ri-book-3-line" /> E-book
      </a>
      <p className="footer__description">
        Find and explore the best <br />
        eBooks from all your <br />
        favorite writers.
      </p>
    </div>
    <div className="footer__data grid">
      <div>
        <h3 className="footer__title">About</h3>
        <ul className="footer__links">
          <li>
            <a href="#" className="footer__link">
              {" "}
              Awards
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              {" "}
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Privacy policy
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Terms of services
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="footer__title">Company</h3>
        <ul className="footer__links">
          <li>
            <a href="#" className="footer__link">
              {" "}
              Blogs
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Community
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Our team
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Help center
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="footer__title">Contact</h3>
        <ul className="footer__links">
          <li>
            <address className="footer__info">
              Av. Hacienda <br />
              Lima 4321, Perú
            </address>
          </li>
          <li>
            <address className="footer__info">
              e.book@email.com <br />
              0987-654-321
            </address>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="footer__title">Social</h3>
        <div className="footer__social">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            className="footer__social-link"
          >
            <i className="ri-facebook-circle-line" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="footer__social-link"
          >
            <i className="ri-instagram-line" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            className="footer__social-link"
          >
            <i className="ri-twitter-x-line" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <span className="footer__copy">
    © All Rights Reserved By Elsayed Abdelaal
  </span>
</footer>

    </>
  )
}

export default Footer;