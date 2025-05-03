import Header from './Header';
import Footer from './Footer';

// import MainBody from './MainBody';


function PageStructure({children}) {



  return (
    <div className="home">
      <div className='top-text'>
      <p>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
        <a href="/" target="_blank" rel="noreferrer">ShopNow</a> 
      </p>

      <form>
        <select id="languages" name="languages" defaultValue="English" required
        className='languages'>
            <option value="English" disabled >English</option>
            <option value="red" >English</option>
            <option value="red" >Yoruba</option>
            <option value="orange" >Spanish</option>
            <option value="orange" >Chinese</option>
        </select>
      </form>
      </div>

      <Header/>

      <>
        {children}
      </>


    <div className='footer-container'>
      <Footer/>
      <div className='bottom-copyright'> <a href='https://www.figma.com/design/noB6Ao9cDlRHCNbJiZgNWP/Full-E-Commerce-Website-UI-UX-Design-(Community)?node-id=1-3&p=f&t=10m0lgK9jcLG9kXW-0' target='_blank' rel='noreferrer'>Click here to view recreated Figma design</a></div>
      <div className='bottom-copyright'> &copy; Copyright Josephdon 2024. All right reserved</div>
    </div>

        
    </div>
  );
}

export default PageStructure;