import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/UserContext";
import { sendLogoutRequest, getBankOperationsRequest } from "../services/MyWalletServer";
import { Header, Page, Value } from "./GenericStyles/styledComponents";
import styled from "styled-components";
import { LogOutOutline } from "react-ionicons";
import BankOperations from "./BankOperations.js";
import NewBankOperationButton from "./NewBankOperationButton";

export default function HomePage() {
    const [ bankOperations, setBankOperations ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const { userData, setUserData } = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            renderBankOperations()
        } else if (userData === ""){
            navigate("/sign-in");
        };
        // eslint-disable-next-line
    }, [userData]);

    useEffect(() => {
        if (bankOperations.lenght) {
            setTotal(bankOperations.map(e => e.value).reduce((p, c) => p + c))
        }
    }, [bankOperations])

    function renderBankOperations() {
        getBankOperationsRequest(userData.token)
            .then(response => {
                setBankOperations(response.data)
            })
            .catch(error => {
                alert('Ocorreu um erro inesperado, tente novamente mais tarde.')
                console.log(error)
            })
    };

    function logout() {
        sendLogoutRequest(userData.token)
            .finally(() => {
                setUserData(null);
                localStorage.removeItem("userData");
                navigate("/sign-in");
            });
    };

    if (!userData) {
        return <Page></Page>
    };

    return (
        <Page>
            <Header>
                <div>Olá, {userData.name}</div>
                <LogOutOutline
                    color={'#fff'}
                    height="40px"
                    width="40px"
                    onClick={logout}
                />
            </Header>
            <BankStatement>
                {bankOperations.length ? 
                    bankOperations.map(e => <BankOperations 
                        key={e.id} 
                        id={e.id}
                        date={e.date}
                        value={e.value}
                        description={e.description}
                    />)
                    :
                    <EmptyBankStatement>
                        <p>Não há registros de <br/> entrada ou saída</p>
                    </EmptyBankStatement>
                }
            </BankStatement>
            <Total>
                <p>Saldo</p>
                <Value value={total}>{total > 0? (total/100).toFixed(2) : (-total/100).toFixed(2)}</Value>
            </Total>
            <Footer>
                <NewBankOperationButton type="entrada"/>
                <NewBankOperationButton type="saída"/>
            </Footer>
        </Page>
    );
};

const BankStatement = styled.div`
    height: calc(100vh - 250px);
    width: 85vw;
    background-color: #fff;
    overflow: scroll;
    padding: 10px;
    border-radius: 5px 5px 0 0;
`;

const EmptyBankStatement = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #868686;
    p{
        text-align: center;
    }
`;

const Footer = styled.footer`
    height: 143px;
    width: 85vw;
    display: flex;
    justify-content: space-between;
`;

const Total = styled.div`
    width: 85vw;
    height: 30px;
    font-size: 17px;
    line-height: 20px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    padding: 10px;
    p{
        font-weight: 700;
    };
`;