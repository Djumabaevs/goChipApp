import React, {useState} from 'react';
import SynFooter from '../../components/layout/footer';
import PetDetailsContainer from './petDetails';
import ScanPetBLEContainer from './scanPetBLEContainer';
import {withApollo} from 'react-apollo';

const ScanPetBLE = (props) => {
  const [wizardStep, setWizardStep] = useState("Scan BLE");
  const [disableContinue, setDisableContiue] = useState(true);
  const [petUid, setPetUid] = useState();

  if(wizardStep === "Scan BLE") {
    const onContinue = () => {
      setWizardStep("Show Pet Details");
      setDisableContiue(true);
    }
    return (
      <>
        <ScanPetBLEContainer
          {...props}
          setPetUid={setPetUid}
          setDisableContiue={setDisableContiue}
        />
        <SynFooter
          onBack={() => props.navigation.navigate("Home")}
          onCancel={() => props.navigation.navigate("Home")}
          onContinue={onContinue}
          disabledContinue={disableContinue}
        />
      </>
    );
  }


  console.log("petUid", petUid);
  if(wizardStep === "Show Pet Details"){

    console.log("Show Pet Details", petUid);
    return (
      <>
        <PetDetailsContainer
          {...props}
          petUid={petUid}
          onBack={() => setWizardStep("Scan BLE")}
        />
        <SynFooter
          onBack={() => setWizardStep("Scan BLE")}
          onCancel={() => props.navigation.navigate("Home")}
        />
      </>
    )
  }
  return null;
}

const apolloScanPetBLE = withApollo(ScanPetBLE);
export default apolloScanPetBLE;
