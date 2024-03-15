import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { Category } from '../../utilities/types';
import './CategoriesIndex.css';

import React from 'react';

const dummyData: Array<Category> = [
  {
    id: 'a',
    title: 'Alt Rock'
  },
  {
    id: 'b',
    title: 'History'
  },
  {
    id: 'c',
    title: 'Film & TV'
  },
  {
    id: 'd',
    title: 'Science'
  },
]

export default function CategoriesIndex() {
  return (
    <div className="CategoriesIndex">
      <h2>Smart your engines!</h2>
      <p>And pick your <span className='bold'>category</span>:</p>
      <hr/>
      {dummyData.map((category)=>{
        return <CategoryCard key={category.id} category={category} />
      })}
    </div>
  );
}