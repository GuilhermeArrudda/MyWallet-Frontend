import { useContext, useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router";
import UserContext from "../contexts/UserContext";
import { postBankOperationsRequest } from "../services/MyWalletServer";
import { EnterButton, GenericForm, GenericInput, Header, Page } from "./GenericStyles/styledComponents";

export default function NewBankOperationPage (){
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {userData} = useContext(UserContext);
    const {type} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (userData) {   
        } else if (userData === "") {
            navigate("/sign-in")
        }
        // eslint-disable-next-line
    }, [userData])

    function confirmBankOperation(e) {
        setIsLoading(true);
        e.preventDefault();
        const intValue = value * 100;
        const body = {
            value: type === "entrada" ? intValue : -intValue,
            description
        };
        postBankOperationsRequest(body, userData.token)
            .then(response => {
                navigate("/")
            })
            .catch(error => {
                alert("Ocorreu um erro inesperado.")
                setIsLoading(false)
            })
    };
    

    return(
        <Page>
            <Header>
                Nova {type}
            </Header>
            <GenericForm onSubmit={confirmBankOperation}>
                <GenericInput
                    placeholder="Valor"
                    type="number"
                    title="Insira apenas números"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <GenericInput
                    placeholder="Descrição"
                    pattern=".{2,}"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    disabled={isLoading}
                    />
                    <EnterButton type="submit" disabled={isLoading}>
                    {!isLoading ? `Salvar ${type}` : <ThreeDots color="#FFF" height={50} width={80} />}
                    </EnterButton>
            </GenericForm>
        </Page>
    );
};