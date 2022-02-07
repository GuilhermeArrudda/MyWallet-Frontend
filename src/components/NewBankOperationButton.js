import { AddCircleOutline, RemoveCircleOutline } from "react-ionicons";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function NewBankOperationButton({type}) {
    let navigate = useNavigate();

    function RedirectToNewBankOperationPage() {
        navigate(`/new/${type}`);
    };

    return(
        <BalanceButton onClick={RedirectToNewBankOperationPage}>
            <div className="icon">
                {type === "entrada" ? <AddCircleOutline
                    color={'#fff'}
                    height='30px'
                    width='30px'
                    />
                    :
                    <RemoveCircleOutline
                    color={'#fff'}
                    height='30px'
                    width='30px'
                    />}
            </div>

            <p>Nova</p>
            <p>{type}</p>
        </BalanceButton>
    );
};

const BalanceButton = styled.div`
    width: 155px;
    height: 114px;
    background-color: #A328D6;
    border-radius: 5px;
    padding: 10px;
    .icon{
        margin-bottom: 30px;
    };
    p{
        font-weight: 700;
        font-size: 17px;
    };
`;