'use client'
import { RouterEvent } from '@/app/lib/router_hipmi/router_event';
import { AccentColor, MainColor } from '@/app_modules/_global/color';
import { Avatar, Box, Card, Flex, Group, Image, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';

function ComponentEvent_ListSponsor({ backgroundColor, border, marginBottom, height, color,  }:
    {
        backgroundColor?: string;
        border?: string;
        marginBottom?: string | number;
        height?: string | number;
        color?: string;
    })
    {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    return (
        <>
            <Box>
                <Card
                    style={{
                        backgroundColor: backgroundColor
                            ? backgroundColor
                            : AccentColor.darkblue,
                        border: `2px solid ${border ? border : AccentColor.blue}`,
                        paddingInline: "16px",
                        paddingBlock: "16px",
                        borderRadius: "10px",
                        color: color ? color : MainColor.white,
                        height: height ? height : "auto",
                        marginBottom: marginBottom ? marginBottom : "15px",                       
                    }}
                    onClick={() => router.push(RouterEvent.detail_sponsor({id: params.id}))}
                >
                    <Flex gap={"md"} align={"center"} justify={"space-between"}>
                        <Group>
                            <Avatar radius={"xl"} size={40}>
                                <Image src={"https://images.app.goo.gl/C7WDoF9X52HC5SJX9"} alt='' />
                            </Avatar>
                            <Text fz={"md"}>INACO</Text>
                        </Group>
                        <Text style={{color: 'white'}}>Rp. 100.000</Text>
                    </Flex>
                </Card>
            </Box>
        </>
    );
}

export default ComponentEvent_ListSponsor;
