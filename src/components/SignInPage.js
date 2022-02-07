import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EnterButton, GenericForm, GenericInput, Logo, Page, TextButton, StyledLink } from "./GenericStyles/styledComponents";
import { sendSignInRequest } from "../services/MyWalletServer";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        if(userData) {
            navigate("/");
        };
        // eslint-disable-next-line
    }, [userData]);

    function signIn(e){
        setIsLoading(true);
        e.preventDefault();
        const body = {
            email,
            password
        };
        sendSignInRequest(body)
            .then(response => {
                setIsLoading(false);
                setUserData(response.data);
                localStorage.setItem("userData", JSON.stringify(response.data));
                navigate("/");
            })
            .catch(error => {
                setIsLoading(false);
                if(!error.response){
                    alert("servidor offline");
                    return;
                };
                if(error.response.status === 401){
                    alert("Email ou senha incorretos");
                    return;
                };
                if(error.response.status === 500){
                    alert("Erro do servidor, tente novamente em alguns instantes.");
                    return;
                };
                alert("Ocorreu um erro inesperado!");
            });
    };

    return (
        <Page>
            <Logo>MyWallet</Logo>
            <GenericForm onSubmit={signIn}>
                <GenericInput
                    placeholder="E-mail"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <GenericInput
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <EnterButton type="submit" disabled={isLoading}>
                {!isLoading ? "Entrar" : <ThreeDots color="#FFF" height={50} width={80} />}
                </EnterButton>
            </GenericForm>
            <StyledLink to={isLoading ? "/sign-in" : "/sign-up"}>
                <TextButton>Primeira vez? Cadastre-se!</TextButton>
            </StyledLink>
        </Page>
    );
};