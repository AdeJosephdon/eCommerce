import MainBody from './MainBody';
import PageStructure from './PageStructure';


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