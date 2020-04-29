import React, {useState, useCallback} from 'react';
import {RectButton, Box, Icon} from '@components/ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Chevron = ({open}: {open: boolean}) => (
  <Icon
    as={MaterialCommunityIcons}
    name={open ? 'chevron-up' : 'chevron-down'}
    size={20}
    color="foreground"
  />
);

type AccordionProps = React.PropsWithChildren<
  React.ComponentProps<typeof Box>
> & {
  renderContent?: (open: boolean) => React.ReactNode;
};

export const Accordion = (props: AccordionProps) => {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((st) => !st), []);
  return (
    <Box {...props}>
      <RectButton onPress={toggle}>
        <Box accessible flexDirection="row">
          {props?.renderContent?.(open)}
        </Box>
      </RectButton>
      {open && props.children}
    </Box>
  );
};
