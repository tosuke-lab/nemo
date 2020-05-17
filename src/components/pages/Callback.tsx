import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {Box, ActivityIndicator} from '@components/ui';
import {useAuthStateOperations} from '@hooks/auth';
import {useAuthCallback} from '@hooks/auth/sea';

type CallbackProps = {
  state: string;
  code: string;
  goNext: () => void;
  goBack: () => void;
};

export const Callback = (props: CallbackProps) => {
  const {addCredential} = useAuthStateOperations();
  const {processCallback} = useAuthCallback();

  useEffect(() => {
    processCallback({
      state: props.state,
      code: props.code,
      onSuccess: (credential) => {
        addCredential(credential);
        console.log(credential);
        props.goNext();
      },
      onFailure: (err) => {
        switch (err) {
          case 'invalidCode':
            Alert.alert('認証コードが異常です');
            break;
          default:
            Alert.alert('謎のエラー');
            break;
        }
        props.goBack();
      },
    });
  }, [props, processCallback, addCredential]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" color="primary" />
    </Box>
  );
};
