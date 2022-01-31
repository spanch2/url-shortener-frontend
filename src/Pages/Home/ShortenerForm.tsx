import * as React from "react";
import { useState } from "react";
import { 
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
    FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';

interface ShortenerFormProps {
    addPair: Function;
}

export const ShortenerForm = (props: ShortenerFormProps) => {
    const { register, handleSubmit, setValue } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ newShort, setNewShort ] = useState('');
    const [urlError, setUrlError] = useState('');
    const [aliasError, setAliasError] = useState('');
    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            const response : AxiosResponse = await axios.post('https://secret-atoll-61569.herokuapp.com/api/shorten', qs.stringify(data))
            console.log(response);
            const short = response.data.shortUrl;
            setNewShort(short);
            props.addPair({longUrl: response.data.longUrl, shortUrl: short});
            setUrlError('');
            setAliasError('');
            onOpen();
        } catch (err) {
            const error = err as AxiosError;
            if (error.response) {
                const message = error.response.data;
                console.log(message);
                if (message === 'Missing URL' || message === 'Invalid URL') {
                    setUrlError(message);
                } else if (message === 'Alias must be at least 4 characters' || error.message === 'Alias unavailable') {
                    setAliasError(message);
                } else if (message === 'Server Error') {

                }
            }
        }
    }
    const onModalClose = () => {
        setNewShort('');
        setValue('url', '');
        setValue('alias', '');
        onClose();
    }

    return (
        <>
            <Flex width="full" align="center" justifyContent="center">
                <Box width='50%' border="1px" borderColor={useColorModeValue('gray.100', 'gray.700')} padding={4} paddingTop={3} rounded='xl'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={urlError !== ''}>
                            <FormLabel>
                                Your Long URL
                            </FormLabel>
                            <Input placeholder="Long URL" {...register('url')}></Input>
                            {urlError !== '' ? 
                                <FormErrorMessage>
                                {urlError}
                                </FormErrorMessage>
                            : 
                                null
                            }
                        </FormControl>
                        <FormControl mt={2} isInvalid={aliasError !== ''}>
                            <FormLabel>
                                Custom Alias (optional)
                            </FormLabel>
                            <Input placeholder="Alias" {...register('alias')}></Input>
                            {aliasError !== '' ? 
                                <FormErrorMessage>
                                {aliasError}
                                </FormErrorMessage>
                            : 
                                null
                            }
                        </FormControl>
                        <Button colorScheme='blue' type="submit" width='100%' mt={3}>
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