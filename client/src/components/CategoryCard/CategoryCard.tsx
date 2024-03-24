import './CategoryCard.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../utilities/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className='CategoryCard'>
      <Link to={`/categories/${category.id}`}>
        <div className='top'>
          <h3>{category.title}</h3>
          <div className='glow'></div>
        </div>
        <div className='bottom'></div>
      </Link>
    </div>
  );
};