import React from 'react';
import CatItem from './catItem';
import DogItem from './dogItem';

const PetItemContainer = (props) => {
  switch (props.pets_type.pet_type_name) {
    case "cat": return <CatItem {...props}/>
    case "dog": return <DogItem {...props}/>
    default: return null;
  }
}

export default PetItemContainer;
