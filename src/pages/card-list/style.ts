import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    padding: 64px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    background-color:transparent;
`

export const CardListBox = styled.div`
    display: flex;
    padding: 10px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    background-color:transparent;
`

export const CardListInner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    box-sizing:border-box;
    background-color:transparent;
`

export const Row = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
    width: 100%;
    background-color:transparent;
    justify-content: flex-start
`

export const Empty = styled.div`
    display: flex;
    flex:1;
    min-width: 0;
    height: 207px;
    padding: 16px 24px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 24px;
    background-color:transparent;
`