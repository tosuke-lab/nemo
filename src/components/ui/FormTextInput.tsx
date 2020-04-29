import React, {useState, useCallback} from 'react';
import {StyleSheet, TextInputProps} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme} from '@components/theme';
import {TextInput, Box, Text, BorderlessButton, Icon} from '@components/ui';

type Props = React.ComponentProps<typeof Box> & {
  label?: string;
  variant?: keyof Theme['textVariants'];
  value?: string;
  onChangeText?: TextInputProps['onChangeText'];
  showClearIcon?: boolean;
};
const textInputStyle = {
  flex: 1,
};
export const FormTextInput = (props: Props) => {
  const [focus, setFocus] = useState(false);
  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const clearText = useCallback(() => {
    props.onChangeText?.('');
  }, [props.onChangeText]);

  return (
    <Box {...props}>
      <Text variant="caption">{props.label}</Text>
      <Box
        minHeight={36}
        flexDirection="row"
        alignItems="flex-end"
        borderBottomColor={focus ? 'primary' : 'border'}
        borderBottomWidth={focus ? 1 : StyleSheet.hairlineWidth}>
        <TextInput
          style={textInputStyle}
          variant={props.variant}
          paddingTop="none"
          paddingBottom="none"
          onFocus={onFocus}
          onBlur={onBlur}
          value={props.value}
          onChangeText={props.onChangeText}
        />
        {focus && (
          <BorderlessButton padding="xs" borderRadius={18} onPress={clearText}>
            <Box accessible>
              <Icon
                as={MaterialCommunityIcons}
                name="close-circle"
                size={20}
                color="foreground"
              />
            </Box>
          </BorderlessButton>
        )}
      </Box>
    </Box>
  );
};
