import './CategoryIndex.css';

import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import * as categoryServices from '../../utilities/category/category-services';
import { Category } from '../../utilities/types';

import CategoryCard from '../../components/CategoryCard/CategoryCard';

export default function CategoryIndex() {

  const [categories, setCategories] = useState<Array<Category>>([]);

  async function handleRequest(){
    await categoryServices.getAllCategories().then((c: Array<Category>)=>{
      setCategories(c);
    })
  }

  useEffect(()=>{
    handleRequest();
  },[])

  if(!categories.length){
    return <p>Loading...</p>
  }

  return (
    <div className='CategoryIndex'>
      <h2>Smart your engines!</h2>
      <p>And pick your <span className='bold'>category</span>:</p>
      <hr />
      {categories.map((category) => {
        return (
          <Link to={`/categories/${category.id}`}>
            <CategoryCard key={category.id} category={category} />
          </Link>
        )
      })}
    </div>
  );
}