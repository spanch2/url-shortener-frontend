import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Center } from '@chakra-ui/react'

import { UrlPair } from "../../Interfaces/UrlPair";

interface GeneratedUrlsProps {
    urlPairs: UrlPair[]
}
export const GeneratedUrls = (props: GeneratedUrlsProps) => {

    return (
        <>
        {props.urlPairs.length > 0 ?
        <Center>
        <Table variant='simple' width='50%' mb={6}>
            <Thead>
                <Tr>
                    <Th>Original URL</Th>
                    <Th>shortnd URL</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.urlPairs.map((pair, key) => {
                    return (
                    <Tr key={key}>
                        <Td>{pair.longUrl}</Td>
                        <Td>{pair.shortUrl}</Td>
                    </Tr>
                    )
                })}
            </Tbody>    
        </Table> 
        </Center>
        : null}
        </>
    )
}