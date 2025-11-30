import Header from './Header';
import Footer from './Footer';

// import MainBody from './MainBody';


function PageStructure({ children }) {
  return (
    <div className="home">
      <div className='top-text'>
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <a href="/" target="_blank" rel="noreferrer">ShopNow</a>
        </p>

        <form aria-labelledby="language-label">
          <label id="language-label" htmlFor="languages">
            Select language
          </label>

          <select
            id="languages"
            name="languages"
            defaultValue=""
            required
            className="languages"
          >
            <option value="" disabled >Choose a language</option>
            <option value="English" >English</option>
            <option value="Yoruba" >Yoruba</option>
            <option value="Spanish" >Spanish</option>
            <option value="Chinese" >Chinese</option>
          </select>
        </form>
      </div>

      <Header />

      <>
        {children}
      </>


      <div className='footer-container'>
        <Footer />
        <div className='bottom-copyright'> <a href='https://www.figma.com/design/noB6Ao9cDlRHCNbJiZgNWP/Full-E-Commerce-Website-UI-UX-Design-(Community)?node-id=1-3&p=f&t=10m0lgK9jcLG9kXW-0' target='_blank' rel='noreferrer'>Click here to view recreated Figma design</a></div>
        <div className='bottom-copyright'> &copy; Copyright Josephdon 2024. All right reserved</div>
      </div>


    </div>
  );
}

export default PageStructure;