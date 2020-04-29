import React, {useCallback, useState} from 'react';
import {ToastAndroid, Alert, StyleSheet} from 'react-native';
import {Box, Text, RectButton, KeyboardAvoidingBox} from '@components/ui';
import {FormTextInput} from '@components/ui/FormTextInput';
import {Accordion, Chevron} from '@components/ui/Accordion';
import {useAuth} from '@hooks/auth/sea';

export const AuthRoot = () => {
  const {startAuth} = useAuth();
  const [host, setHost] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const authorize = useCallback(async () => {
    startAuth({
      host: host.trim(),
      clientId: clientId !== '' ? clientId.trim() : undefined,
      clientSecret: clientSecret !== '' ? clientSecret.trim() : undefined,
      onError: (err) => {
        switch (err) {
          case 'closed':
            Alert.alert(
              'ブラウザが閉じられました',
              '未ログインであるか，ホストが存在しない可能性があります',
            );
            return;
          case 'requireCredentials':
            Alert.alert('認証情報が必要です');
            return;
          default:
            ToastAndroid.show('エラー', ToastAndroid.SHORT);
            return;
        }
      },
    });
  }, [startAuth, host, clientId, clientSecret]);

  const authButtonEnabled = host !== '';

  const renderAccordion = useCallback(
    (open: boolean) => (
      <Box
        flex={1}
        paddingVertical="sm"
        paddingHorizontal="lg"
        flexDirection="row"
        justifyContent="space-between">
        <Text variant="body">認証情報をカスタムする</Text>
        <Chevron open={open} />
      </Box>
    ),
    [],
  );
  return (
    <KeyboardAvoidingBox flex={1} marginTop="lg">
      <Box marginHorizontal="lg">
        <Text variant="heading" textAlign="center">
          Seaで認証
        </Text>
        <FormTextInput
          marginTop="sm"
          label="ホスト名"
          variant="body"
          value={host}
          onChangeText={setHost}
          showClearIcon
        />
      </Box>
      <Accordion marginTop="sm" renderContent={renderAccordion}>
        <Box marginHorizontal="lg">
          <FormTextInput
            marginTop="sm"
            label="Client ID"
            variant="body"
            value={clientId}
            onChangeText={setClientId}
            showClearIcon
          />
          <FormTextInput
            marginTop="sm"
            label="Client Secret"
            variant="body"
            value={clientSecret}
            onChangeText={setClientSecret}
            showClearIcon
          />
        </Box>
      </Accordion>
      <Box
        marginTop="auto"
        paddingHorizontal="lg"
        borderColor="border"
        borderTopWidth={StyleSheet.hairlineWidth}>
        <RectButton
          alignSelf="flex-end"
          marginVertical="sm"
          paddingHorizontal="lg"
          height={36}
          borderRadius={36 / 2}
          enabled={authButtonEnabled}
          backgroundColor={authButtonEnabled ? 'primary' : 'gray600'}
          onPress={authorize}>
          <Box accessible flex={1} justifyContent="center" alignItems="center">
            <Text variant="medium" color="white">
              認証
            </Text>
          </Box>
        </RectButton>
      </Box>
    </KeyboardAvoidingBox>
  );
};
