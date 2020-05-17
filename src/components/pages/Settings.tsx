import React, {useState, useCallback} from 'react';
import {Box, Text, RectButton} from '@components/ui';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native';
import {useAuthState} from '@hooks/auth';

type DialogProps = React.PropsWithChildren<{
  visible: boolean;
  onVisibilityChanged: (visible: boolean) => void;
}>;

const Dialog = (props: DialogProps) => {
  const {onVisibilityChanged} = props;
  const dismiss = useCallback(() => onVisibilityChanged(false), [
    onVisibilityChanged,
  ]);
  return (
    <Modal
      transparent
      hardwareAccelerated
      visible={props.visible}
      animationType="fade"
      onRequestClose={dismiss}>
      <TouchableWithoutFeedback onPress={dismiss}>
        <Box
          style={StyleSheet.absoluteFill}
          backgroundColor="background"
          opacity={0.01}
        />
      </TouchableWithoutFeedback>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box
          elevation={1}
          paddingHorizontal="lg"
          backgroundColor="background"
          minWidth={280}
          borderRadius={8}>
          {props.children}
        </Box>
      </Box>
    </Modal>
  );
};

type SettingsProps = {
  navigateToAuthScreen: () => void;
};

export const Settings = ({navigateToAuthScreen}: SettingsProps) => {
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const openLogoutDialog = useCallback(() => setLogoutDialogVisible(true), []);
  const cancelLogout = useCallback(() => setLogoutDialogVisible(false), []);

  const [state, dispatch] = useAuthState();
  const logout = useCallback(() => {
    dispatch({
      type: 'remove',
      id: state.defaultId!,
    });
    navigateToAuthScreen();
  }, [state, dispatch, navigateToAuthScreen]);

  return (
    <ScrollView>
      <Box paddingVertical="sm">
        <Text
          paddingHorizontal="md"
          variant="caption"
          color="primary"
          fontWeight="bold">
          アカウント設定
        </Text>
        <RectButton onPress={openLogoutDialog}>
          <Box
            accessible
            paddingHorizontal="md"
            minHeight={48}
            justifyContent="center">
            <Text variant="body" color="danger" fontWeight="bold">
              ログアウト
            </Text>
          </Box>
        </RectButton>
        <Dialog
          visible={logoutDialogVisible}
          onVisibilityChanged={setLogoutDialogVisible}>
          <Text variant="body" marginTop="md">
            ログアウト
          </Text>
          <Text variant="caption" marginTop="xs">
            ログアウトしますか？
          </Text>
          <Box marginBottom="xs" flexDirection="row" justifyContent="flex-end">
            <TouchableNativeFeedback onPress={cancelLogout}>
              <Box
                accessible
                minHeight={48}
                paddingHorizontal="xs"
                justifyContent="center">
                <Text variant="caption" color="primary">
                  キャンセル
                </Text>
              </Box>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={logout}>
              <Box
                accessible
                marginLeft="xs"
                minHeight={48}
                paddingHorizontal="xs"
                justifyContent="center">
                <Text variant="caption" color="danger">
                  ログアウト
                </Text>
              </Box>
            </TouchableNativeFeedback>
          </Box>
        </Dialog>
      </Box>
    </ScrollView>
  );
};
