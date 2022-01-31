import * as React from "react";
import { useState } from "react";
import { 
    Center,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
    useDisclosure,
    Button,
    Box,
    Flex,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'qs';

import { UrlPair } from '../interfaces/UrlPair';

export const ShortenerForm = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ newShort, setNewShort ] = useState('');

    const onSubmit = (data: any) => {
        console.log(data);
        axios.post('https://secret-atoll-61569.herokuapp.com/api/shorten', qs.stringify(data)).then((response) => {
            console.log(response);
            const short = response.data.shortUrl;
            setNewShort(short);
            const storedPairs = sessionStorage.getItem('generated');
            if (storedPairs) {
                const urlPairs : UrlPair[] = JSON.parse(storedPairs);
                urlPairs.push({longUrl: response.data.longUrl, shortUrl: short});
                sessionStorage.setItem('generated', JSON.stringify(urlPairs));
            } else {
                const urlPairs : UrlPair[] = [];
                urlPairs.push({longUrl: response.data.longUrl, shortUrl: short})
                sessionStorage.setItem('generated', JSON.stringify(urlPairs));
            }
            onOpen();
        })
    }
    const onModalClose = () => {
        setNewShort('');
        setValue('url', null);
        setValue('alias', null);
        onClose();
    }

    return (
        <>
            <Flex width="full" align="center" justifyContent="center">
                <Box width='50%' border="1px" borderColor={useColorModeValue('gray.100', 'gray.900')} padding={4} paddingTop={3} rounded='xl'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormLabel>
                                Your Long URL
                            </FormLabel>
                            <Input placeholder="Long URL" {...register('url')}></Input>
                        </FormControl>
                        <FormControl mt={2}>
                            <FormLabel>
                                Custom Alias (optional)
                            </FormLabel>
                            <Input placeholder="Alias" {...register('alias')}></Input>
                        </FormControl>
                        <Button type="submit" width='100%' mt={3}>
                            Make it shortnd!
                        </Button>
                    </form>
                </Box>
            </Flex>
            <Modal isOpen={isOpen} onClose={onModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Your shortnd URL</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input isReadOnly={true} value={newShort}/>
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme='blue' onClick={onModalClose}>
                        Generate Another
                    </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};