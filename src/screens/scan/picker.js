import {Picker} from '@react-native-picker/picker';

<Picker
selectedValue={selectedLanguage}
onValueChange={(itemValue, itemIndex) =>
  setSelectedLanguage(itemValue)
}>
<Picker.Item label="Java" value="java" />
<Picker.Item label="JavaScript" value="js" />
</Picker>
