import './CategoryIndex.css';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as categoryServices from '../../utilities/category/category-services';
import { Category } from '../../utilities/types';

import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Loading from '../../components/Loading/Loading';
import Banner from '../../components/Banner/Banner';

export default function CategoryIndex() {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Array<Category>>([]);

  async function handleRequest(): Promise<void> {
    await categoryServices.getAllCategories().then((c: Array<Category>) => {
      setCategories(c);
    });
  };

  useEffect(() => {
    dispatch(updateCurrentPage('categories'));
    handleRequest();
  }, []);

  if (!categories.length) {
    return <Loading />;
  }

  return (
    <div className='CategoryIndex'>
      <Banner source='https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' altText='brown wodden drawer' sub='Smart your engines!' />
      <div className='pick'>
        <p>Pick your <span className='cursive bold'>category</span>:</p>
      </div>
      <div className='list'>
        {categories.map((category) => {
          return (
            <CategoryCard key={category.id} category={category} />
          )
        })}
      </div>
    </div>
  );
};