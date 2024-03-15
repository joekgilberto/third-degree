import './CategoryCard.css';

import React from 'react';
import { Category } from '../../utilities/types';

export default function CategoryCard({category}:{category: Category}) {
  return (
    <div className="CategoryCard">
      <h3>{category.title}</h3>
    </div>
  );
}