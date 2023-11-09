import React from 'react'
import FomrSimple from './FormSimple'
import FomWithValidation from './FomWithValidation'
import FormMaterial from './FormMaterial'
import FormWithState from  './FormWithState'

export default function App() {
  return (
    <div className='container'>
      {/* <FomrSimple />
      <FomWithValidation />
      <FormMaterial /> */}
      <FormWithState />
    </div>
  )
}
