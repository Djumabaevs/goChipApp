import {AbilityBuilder, Ability} from '@casl/ability';

export default function defineRulesFor(user) {
  const {can, rules} = new AbilityBuilder(Ability);
  if (user && user.role === 'admin') {
    can('read', ['Home', 'Pets', 'Persons', 'Devices', 'Licenses', 'Digital Identity', 'Associate Items', 'Scan Pet using NFC', 'Scan Pet using BLE']);
  } else {
    can('read', ['Home', 'Associate Items', 'Scan Pet using NFC', 'Scan Pet using BLE']);
  }
  return rules;
}

export function buildAbilityFor(user) {
  return new Ability(defineRulesFor(user), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: object => {
      console.log('object', object);
      return object;
    },
  });
}
