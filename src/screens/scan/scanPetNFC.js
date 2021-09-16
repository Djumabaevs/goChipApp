import React, {useState} from 'react';
import SynFooter from '../../components/layout/footer';
import ScanPet from './scanPet';
import {withApollo} from 'react-apollo';
import PetDetailsContainer from './petDetails';

const ScanPetNFC = (props) => {
  const [wizardStep, setWizardStep] = useState("Scan NFC");
  const [disableContinue, setDisableContiue] = useState(true);
  const [petUid, setPetUid] = useState();

    if(wizardStep === "Scan NFC") {
    const onContinue = () => {
      setWizardStep("Show Pet Details");
      setDisableContiue(true);
    }
    return (
      <>
        <ScanPet
          {...props}
          setPetUid={setPetUid}
          petUid={petUid}
          setDisableContiue={setDisableContiue}
        />
        <SynFooter
          onBack={() => {
            setDisableContiue(true);
            setPetUid();
          }}
          onCancel={() => props.navigation.navigate("Home")}
          onContinue={onContinue}
          disabledContinue={disableContinue}
        />
      </>
    )
  }

  if(wizardStep === "Show Pet Details"){
    return (
      <>
        <PetDetailsContainer
          {...props}
          petUid={petUid}
          onBack={() => setWizardStep("Scan NFC")}
        />
        <SynFooter
          onBack={() => setWizardStep("Scan NFC")}
          onCancel={() => props.navigation.navigate("Home")}
        />
      </>
    )
  }
  return null;
}



const apolloScanPetNFC = withApollo(ScanPetNFC);
export default apolloScanPetNFC;
