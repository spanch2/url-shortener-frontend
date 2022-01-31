import * as React from "react";

import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Center,
    Text
  } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../../ColorModeSwitcher"
  
export const NavBar = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Box bgColor={useColorModeValue('gray.100', 'gray.900')} px={4} position='fixed' w='100%' zIndex={}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize='3xl' fontWeight={'semibold'}>
                shortnd.io
            </Text>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={3}>
              <ColorModeSwitcher justifySelf="flex-end" />
  
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded='md'
                    variant='ghost'
                    padding={2}
                    minW={0}>
                    <Box>
                        Your Account
                    </Box>
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <Center>
                        Coming Soon!
                    </Center>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }
