import * as React from "react";
import { ShortenerForm } from './ShortenerForm'
import { GeneratedUrls } from './GeneratedUrls'
import { useState, useEffect } from "react";
import { UrlPair } from "../../Interfaces/UrlPair";
import { Text, VStack } from "@chakra-ui/react";


export const Home = () => {
    const [urlPairs, setUrlPairs] = useState([] as UrlPair[]);

    useEffect(() => {
        retrieve()
    }, [])

    const retrieve = async () => {
        const generated = await sessionStorage.getItem("generated");
        if (generated) {
            const generatedArray = JSON.parse(generated);
            setUrlPairs(generatedArray);
        }
        console.log('retrieved');
        console.log(urlPairs.length);
    }

    const addPair = (pair: UrlPair) => {
        setUrlPairs([...urlPairs, pair]);
        sessionStorage.setItem('generated', JSON.stringify(urlPairs));
        console.log("Pair Added");
        console.log(urlPairs);
    }

    return (
        <>
            <VStack spacing={-3} mb={4}>
            <Text mt='60px' fontWeight={'semibold'} fontSize='7xl'>shortnd.io</Text>
            <Text fontSize='xl'>Shorten your URLs easily</Text>
            </VStack>
            <ShortenerForm addPair={addPair}></ShortenerForm>
            <GeneratedUrls urlPairs={urlPairs}></GeneratedUrls>
        </>
    );
};