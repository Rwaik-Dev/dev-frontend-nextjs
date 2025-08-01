"use client";
import React from 'react'
import ItemCard from './_components/ItemCard';

export default function Home() {
  return (
    <main className='grid grid-cols-3 gap-4 px-24'>
      {Array.from({ length: 15 }).map((_, index) => <ItemCard key={index} id={1} title={'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'} price={109.95} description={'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday'} category={'men\'s clothing'} image={'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'} rating={{
        rate: 4,
        count: 125
      }} />)}
    </main>
  )
}
