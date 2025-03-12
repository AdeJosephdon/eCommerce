import MainBody from '../components/MainBody';
import PageStructure from '../components/PageStructure';


function Home(prop) {

  // console.log(prop.data)


  return (

    <PageStructure>
      {/* {prop.data ?  */}
      
      <MainBody/> 
      {/* // : <main className='loading'><h1>Loading...</h1></main>  */}
      {/* } */}
    </PageStructure>  

  );
}

export default Home;