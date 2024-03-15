import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { Category } from '../../utilities/types';
import './CategoryIndex.css';

import React from 'react';
import { Link } from 'react-router-dom';

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

export default function CategoryIndex() {
  return (
    <div className='CategoryIndex'>
      <h2>Smart your engines!</h2>
      <p>And pick your <span className='bold'>category</span>:</p>
      <hr />
      {dummyData.map((category) => {
        return (
          <Link to={`/categories/${category.id}`}>
            <CategoryCard key={category.id} category={category} />
          </Link>
        )
      })}
    </div>
  );
}