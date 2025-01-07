import { useState } from 'react'
import './KneelDiamonds.css'
import { Orders } from './Orders.jsx'
import { Metals } from './Metals.jsx'
import { JewelrySizes } from './JewelrySizes.jsx'
import { DiamondSizes } from './DiamondSizes.jsx'

function KneelDiamonds() {


  return (
    <>
      <div>KneelDiamonds</div>

      <Metals />
      <JewelrySizes />
      <DiamondSizes />
      <Orders />
    </>
  )
}

export default KneelDiamonds
