import gql from "graphql-tag";

export const loginQuery = gql(`
  query _login($phoneNumber:String!) {
    login(phoneNumber:$phoneNumber){
      status
      valid
    }
  }`);

export const verifyQuery = gql(`
query _verify ($phoneNumber:String!, $code: String!){
  verify(phoneNumber:$phoneNumber, code:$code){
    status
    valid
}
}`)


export const getPhoneVetById = gql(`
query getPhoneVetById($vet_uid: uuid){
  vets(where:{vet_uid:{_eq: $vet_uid}}){
    vet_phone
  }
}`)

export const checkPhoneNumber = gql(`
query checkPhoneNumber($phone: String){
  persons(where:{person_phone: {_eq: $phone}}){
    person_name
    person_phone
  }
}`)

export const getVetPersonByPhone = gql(`
query getVetPersonByPhone($phone: String){
  persons(where:{person_phone:{_eq: $phone}}){
    person_uid
    person_name
    status
    persons_vets{
      row_id
      status
      vet{
        vet_name
        vet_uid
      }
    }
  }
}`)

export const getAllStatuses = gql(`
  query getAllStatuses {
    statuses{
      status_id
      status_name
    }
  }
`)

export const getAllPets = gql(`
query getAllPets($orderType: order_by, $where:pets_bool_exp) {
  pets(order_by:{pet_name: $orderType}, where: $where) {
    pet_uid,
    pet_name,
    status,
    pets_type{
      pet_type_name
    }
    cats{
      cats_breed{
        breed_name
      }
      colour,
      gender,
      weight
    }
    dogs{
     dogs_breed {
      breed_name
    }
    colour,
    gender,
    weight 
    }
  }
  persons_pets{
    person{
      person_name
    }
  }
}`)

export const getAllCities = gql(`
  query getAllCities{
    cities{
      city_uid
      city_name
      country{
        country_name
      }
    }
  }
`)

export const getAllPersons = gql(`
query getAllPersons($orderType: order_by, $where: persons_bool_exp) {
  persons(order_by:{person_name: $orderType}, where: $where) {
   person_uid
    person_name,
    person_phone,
    status
  }
}`)

export const getAllLicenseTypes = gql(`
query getAllLicenseTypes($orderType: order_by, $where: license_types_bool_exp){
  license_types(order_by:{ license_type_name: $orderType }, where: $where){
    license_type_id
    license_type_name
    status
  }
}`)


export const getMaxLicenseId = gql(`
query getMaxLicenseId{
  city_licenses_aggregate{
    aggregate{
      max{
        license_id
      }
    }
  }
}`)

export const getAllLicenses = gql(`
query getAllLicences($orderType: order_by, $where: city_licenses_bool_exp) {
  city_licenses(order_by:{row_id: $orderType}, where: $where){
    city_license_uid
    license_id
    status
    effective_from
    effective_to
    cost_paid
    city{
      city_name
      country{
        country_name
      }      
    }
    pet{
      pet_name
    }
    license_type{
      license_type_name
    }
  }
}`)

export const getAllBreeds = gql(`
query getAllBreads{
    dogs_breeds {
        breed_id
        breed_name
  }
    cats_breeds{
    breed_id
    breed_name
  }
}`)

export const getAllPetsWithCityChipOrGochipCollar = gql(`
  query getAllPetsWithCityChipOrGochipCollar{
  pets(where:{pets_devices:{ device:{ device_type_id:{_in: [4,2]} } } } ){
    pet_uid
    pet_name
    pets_devices(where:{ device:{ device_type_id:{_in: [4,2]} } } ){
      device{
        device_uid
        device_name
        
        devices_type{
          device_type_id
          device_type_name
        }
        city_chips{
          chip_id
        }
        gochip_collars{
          serial_number
        }
      }
    }
  }
} 
`)

export const getAllPetsWithCityChipOrGochipCollarById = gql(`
  query getAllPetsWithCityChipOrGochipCollar($id: String){
  pets(where:{pets_devices:{ device:{ device_type_id:{_in: [4,2]} _or:[{ gochip_collars:{device_id:{_eq:$id}}},{city_chips:{device_id:{_eq: $id}}}] } } } ){
    pet_uid
    pet_name
    pets_devices(where:{ device:{ device_type_id:{_in: [4,2]} } } ){
      device{
        device_uid
        device_name
        
        devices_type{
          device_type_id
          device_type_name
        }
        city_chips{
          chip_id
        }
        gochip_collars{
          serial_number
        }
      }
    }
  }
} 
`)

export const getAllDevices = gql(`
query getAllDevices($where: devices_bool_exp){
 devices(where: $where){
  device_uid
  device_name
  device_type_id
   chips{
      iso
    }
   gochips{
    nfc
   }
 }  
}`)

export const getJobTypes = gql(`
query getJobTypes{
  syn_did_job_types{
    job_type_id
    job_type_name
  }
}`)

export const getParameters = gql(`
query getParameters{
    syn_did_parameters{
      did_parameter_uid
      did_parameter_name
    }
}`)

export const getAllPetTypes = gql(`
query getAllPetsType{
      pets_types{
        pet_type_id
        pet_type_name
      }
}`)



export const getAllChips = gql(`
query getAllChips($orderType: order_by, $where: devices_bool_exp) {
  devices(order_by:{device_name: $orderType}, where: $where) {
      device_uid
      device_name
      status
      devices_type{
        device_type_id
        device_type_name
      }
      manufacturer{
      manufacturer_name
      }
      chips{
        batch_number
        model_number
        serial_number
        iso
      }
      gochip_collars{
        batch_number
        serial_number
        model_number
        device_id
      }
      gochips{
        batch_number
        model_number
        serial_number
        iso
        nfc
      }
      city_chips{
        batch_number
        model_number
        serial_number
        device_id
      }
    }
}`)

export const getChipById = gql(`
query getChipById($orderType: order_by, $where: devices_bool_exp) {
  devices(order_by:{record_time: $orderType}, where: $where) {
      device_uid
      device_name
      status
      devices_type{
        device_type_id
        device_type_name
      }
  }
}`)


export const getAllDevicesTypes = gql(`
query getAllDevicesTypes{
  devices_types(order_by:{device_type_name:asc}) {
    device_type_id
    device_type_name
  }
}`)

export const getAllManufacturers = gql(`
query getAllManufacturers{
    manufacturers{
        manufacturer_uid
        manufacturer_name
    }
}`)

export const getGoChipByCode = gql(`
query getGoChipByCode($nfc: String){
  gochips(where:{nfc:{_eq:$nfc}}){
    status
    nfc
    iso
    row_id
    device{
      device_uid
      device_name
      
      pets_devices{
        pet{
          status
          pet_uid
          pet_name
          pets_type{
            pet_type_name
          }
        }
      }      
    }
  }
}`)

export const getGoChipViewByCode = gql(`
query getGoChipByCode($nfc: String){
  gochips_not_associated(where:{nfc:{_eq:$nfc}}){
    status
    nfc
    iso
    row_id
    device_uid
    device_name
    is_assigned
  }
}`)

export const getGoChipWithPetWithoutCityChipViewByCode = gql(`
query getGoChipByCode($nfc: String){
  gochips_associated_with_pet_without_citychip(where:{nfc:{_eq:$nfc}}){
    status
    nfc
    iso
    device_uid
    device_name
  }
}`)

export const getPetDevice = gql(`
query getPetDevice($pet_uid: uuid, $device_uid: uuid, $installer_person_uid: uuid){
  pets_devices(where:{pet_uid: {_eq: $pet_uid}, device_uid: {_eq: $device_uid}, installer_person_uid: {_eq: $installer_person_uid}}){
    status
  }
}`)

export const getPet = gql(`
query getPet($pet_uid: uuid){
  pets(where:{pet_uid:{_eq: $pet_uid}}){
     pet_uid,
    pet_name,
    pet_photo,
    status,
    pets_type{
      pet_type_name
    }
    cats{
      cats_breed{
        breed_name
      }
      colour,
      gender,
      weight
    }
    dogs{
     dogs_breed {
      breed_name
    }
    colour,
    gender,
    weight 
    }
     pets_devices{
      from_time
      to_time
      device{
        device_uid
        devices_type{
        device_type_id
        device_type_name
        }
      }
    }
    city_licenses{
      city_license_uid
      effective_from
      effective_to
      license_type{
        license_type_name
      }
    }
  }
  }
`)

export const getPersonPet = gql(`
query getPersonPet($person_uid: uuid, $pet_uid: uuid){
  persons_pets(where:{ person_uid: {_eq: $person_uid}, pet_uid:{_eq: $pet_uid}}){
    status
  }
}`)
export const generateDigitalIdentity = gql(`
query generateDigitalIdentity($device_id: uuid, $person_uid: uuid, $pet_uid: uuid, $vet_person_id: uuid){
  generate_and_return_did(args: {device_id: $device_id, person_id: $person_uid, pet_id: $pet_uid, vet_person_id:$vet_person_id  }){
    status_name
  }
}`)

