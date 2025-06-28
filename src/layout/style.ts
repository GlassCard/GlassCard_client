import styled from "@emotion/styled";
import layout from '@/assets/layout.svg';

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    width:100vw;
    height:100%;
    min-height:100vh;
    background-image:url(${layout});
    background-repeat:no-repeat;
    background-size: cover;
`