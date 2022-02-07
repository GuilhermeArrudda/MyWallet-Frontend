import dayjs from "dayjs";
import styled from "styled-components";
import { Value } from "./GenericStyles/styledComponents.js";


export default function bankOperations({id, date, value, description}){
    console.log(description)
    return(
        <BankOperationSC>
            <div className="description"><Date>{dayjs(date).format("DD/MM")}</Date> {description}</div>
            <Value value={value}>{value > 0? (value/100).toFixed(2) : (-value/100).toFixed(2)}</Value>
        </BankOperationSC>
    );
};

const BankOperationSC = styled.div`
    width: 100%;
    height: 30px;
    font-size: 16px;
    line-height: 18px;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .description{
        width: 75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    };
`;

const Date = styled.span`
    color: #c6c6c6;
`;