
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
   // Rename data to blogs for this block.
   const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');
   
   // dynamic JavaScript must be done inside {}, Conditional Template with && blogs is checked first for 'true'
   return (
      <div className="home">
         { error && <div>{ error }</div> }
         { isPending && <div>Loading...</div> }
         {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
      </div>
     );
}
 
export default Home;