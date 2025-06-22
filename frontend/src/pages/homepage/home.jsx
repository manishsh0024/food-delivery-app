import { useState } from 'react';
import Header from '../../components/header/header'
import ExploreMenu from '../../components/ExploreMenu/explore-menu'
import FoodDisplay from '../../components/FoodDisplay/foodDisplay';

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
    </div>
  )
}

export default Home