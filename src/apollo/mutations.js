import gql from "graphql-tag";

export const addPet = gql(`
    mutation addPet($pet:pets_insert_input!){
      insert_pets(objects:[$pet]){
        affected_rows
      }
    }
`)

export const addPerson = gql(`
    mutation addPerson($person:persons_insert_input!){
      insert_persons(objects:[$person]){
        affected_rows
      }
    }
`)

export const addChip = gql(`
    mutation addChip($chip:devices_insert_input!){
      insert_devices(objects:[$chip]){
        affected_rows
      }
    }
`)


export const addPetDevice = gql(`
    mutation addPetDevice($pet_device:pets_devices_insert_input!){
      insert_pets_devices(objects:[$pet_device]){
        affected_rows
      }
    }
`)

export const addLinkedDevice = gql(`
    mutation addLinkedDevice($linked_device:linked_devices_insert_input!){
      insert_linked_devices(objects:[$linked_device]){
        affected_rows
      }
    }
`)

export const addLicense = gql(`
    mutation addLicense($license:city_licenses_insert_input!){
      insert_city_licenses(objects:[$license]){
        affected_rows
      }
    }
`)
export const addLicenseType = gql(`
    mutation addLicenseType($license:license_types_insert_input!){
      insert_license_types(objects:[$license]){
        affected_rows
      }
    }
`)

export const addPersonPet = gql(`
    mutation addPersonPet($person_pet:persons_pets_insert_input!){
      insert_persons_pets(objects:[$person_pet]){
        affected_rows
      }
    }
`)
export const addJob = gql(`
    mutation addJob($job:syn_did_jobs_insert_input!){
      insert_syn_did_jobs(objects:[$job]){
        affected_rows
           returning{
              job_uid
            }
      }
    }
`)
export const addJobParams = gql(`
    mutation addJobParams($jobParams:[syn_did_jobs_parameters_insert_input!]!){
      insert_syn_did_jobs_parameters(objects:$jobParams){
        affected_rows
      }
    }
`)
