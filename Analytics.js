import React from 'react';
import { Mixpanel } from 'mixpanel-react-native';

import {MIXPANEL_TOKEN} from './Constants'

const MixpanelContext = React.createContext();

export const useMixpanel = () => React.useContext(MixpanelContext);

export const MixpanelProvider = ({children}) => {
  const [mixpanel, setMixpanel] = React.useState(null);

  React.useEffect(() => {
    const trackAutomaticEvents = true;
    const mixpanelInstance = new Mixpanel(MIXPANEL_TOKEN, trackAutomaticEvents);
    mixpanelInstance.init();
    setMixpanel(mixpanelInstance);
    console.log("mixpanelInstance",mixpanelInstance)
  }, []);

  return <MixpanelContext.Provider value={mixpanel}>{children}</MixpanelContext.Provider>;
};
