export const buildVariablesGetAllPet = (filters, order) => {
      let where = {};
      let _wherePet = {};
      if(filters.dogBreeds && filters.dogBreeds.length > 0){
          _wherePet.breed_id = {
              _in:  filters.dogBreeds
          }
      }
      if(filters.catBreeds && filters.catBreeds.length > 0){
          _wherePet.breed_id = {
              _in:  filters.catBreeds
          }
      }
      if(filters.genders && filters.genders.length > 0){
          _wherePet.gender = {
              _in:  filters.genders.map((gender) => gender.toLowerCase())
          }
      }
      if(filters.color){
          _wherePet.colour = {
              _eq: filters.color
          }
      }
      if(filters.minWeight){
          _wherePet.weight = {
              _gte: filters.minWeight
          }
      }
      if(filters.maxWeight){
          _wherePet.weight = {
              ...where.weight,
              _lte: filters.maxWeight
          }
      }
      if(filters.pet)
          where[`${filters.pet}s`] = _wherePet;
      return { orderType: order, where };
}

export const buildVariablesGetAllPersons = (filters, order) => {
    let where = {};
    if(filters){
      if(filters.person_name){
        where.person_name = {
          _like: `%${filters.person_name}%`
        }
      }
      if(filters.person_phone){
        where.person_phone = {
          _like: `%${filters.person_phone}%`
        }
      }
    }
    return { orderType: order, where };
}

export const buildVariablesGetAllChips = (filters, order) => {
  let where = {};
  if(filters){
    if(filters.selectedTypes && filters.selectedTypes.length > 0){
      where = { device_type_id: { _in: filters.selectedTypes } }
    }
    if(filters.deviceName){
      where = {
        ...where,
        device_name: {
          _like: `%${filters.deviceName}%`
        }
      }
    }
  }
    return { orderType: order, where };
}

export const buildVariablesGetAllLicenseTypes = (filters, order) => {
  let where = {};
  if(filters){
    if(filters.license_type_name){
      where.license_type_name = {
        _like: `%${filters.license_type_name}%`
      }
    }
  }
    return { orderType: order, where };
}
