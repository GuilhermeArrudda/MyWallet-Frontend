import { useState } from "react"
import { useNavigate } from "react-router";
import { sendSignUpRequest } from "../services/MyWalletServer";
import { EnterButton, GenericForm, GenericInput, Logo, Page, StyledLink, TextButton } from "./GenericStyles/styledComponents";

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    function signUp(e) {
        setIsLoading(true);
        e.preventDefault();
        const body = {
            name,
            email,
            password
        };
        sendSignUpRequest(body)
            .then(response => {
                setIsLoading(false);
                navigate("/sign-in");
            })
            .catch(error => {
                setIsLoading(false);
                if(error.response.status === 409) {
                    alert("E-mail já está em uso, escolha um diferente.");
                    return;
                }
                if(error.response.status === 500) {
                    alert("Erro do servidor, tente novamente em alguns instantes.");
                    return;
                }
                alert("Ocorreu um erro inesperado!");
            }) ;
    }
    return (
        <Page>
            <Logo>MyWallet</Logo>
            <GenericForm onSubmit={signUp}>
                <GenericInput
                    placeholder="Nome"
                    value={name}
                    pattern="[A-Za-z]{3,30} [A-Za-z]{3,30}"
                    title="Insira seu nome e último nome"
                    onChange={e => setName(e.target.value)}
                    required
                    disable={isLoading}
                />
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
                    pattern="\S[0-9]{5,}"
                    title="Minimo 6 caracteres (Apenas números)."
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <GenericInput
                    placeholder="Confirme a senha"
                    type="password"
                    value={password2}
                    pattern={password}
                    title="Senhas devem ser iguais"
                    onChange={e => setPassword2(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <EnterButton type="submit" disabled={isLoading}>Cadastrar</EnterButton>
            </GenericForm>
            <StyledLink to={isLoading ? "/sign-up" : "/"}>
                <TextButton>Já tem uma conta? Entre agora!</TextButton>
            </StyledLink>
        </Page>
    );
};