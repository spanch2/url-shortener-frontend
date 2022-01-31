import * as React from "react";

import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
  } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../ColorModeSwitcher"
  
export const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
                shortnd.io
            </Box>
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
