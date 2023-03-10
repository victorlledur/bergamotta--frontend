import { Link, useNavigate } from "react-router-dom";
import TitleLogin from "../../components/TitleLogin";
import InputLogin from "../../components/InputLogin";
import UserType from "../../components/UserType";
import LogoSrc from "../../assets/image/logo_vertical.png";
import { Box, Inputs, RadioGroupStyled, Container } from "./styles";
import SignUpLink from "../../components/SignUpLink";
import { useState } from "react";
import { createUser } from "../../services/MainApi/sign_in";
import { useForm } from "react-hook-form";
import { FormControl } from "@mui/material";
import { createOwner } from "../../services/MainApi/owner";
import { Footer } from "../../components/Footer";
import SubmitButton from "../../components/SubmitButton";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
   
    if (toggle) {
      ownerCreate(
        data.email,
        data.password,
        data.name,
        data.image_link,
        data.city,
        data.state,
        data.country,
        data.cnpj,
        data.role
      );
    } else {
      userCreate(
        data.email,
        data.password,
        data.name,
        data.image_link,
        data.city,
        data.state,
        data.country
      );
    }
  };
  const userCreate = async (
    email: string,
    password: string,
    name: string,
    image_link: string,
    city: string,
    state: string,
    country: string
  ) => {
    const req = {
      email: email,
      password: password,
      name: name,
      image_link: image_link,
      city: city,
      state: state,
      country: country,
    };
    try {
      const response = await createUser(req);
 
      navigate("/login");
    } catch (error) {
      alert("Deu algo errado no catch");
    }
  };
  const ownerCreate = async (
    email: string,
    password: string,
    name: string,
    image_link: string,
    city: string,
    state: string,
    country: string,
    cnpj: string,
    role: string
  ) => {
    const req = {
      email: email,
      password: password,
      name: name,
      image_link: image_link,
      city: city,
      state: state,
      country: country,
      cnpj: cnpj,
      role: role,
    };
    try {
      const response = await createOwner(req);
     
      navigate("/login");
    } catch (error) {
      alert("Deu algo errado no catch");
    }
  };

  const [toggle, setToggle] = useState<boolean>(false);
  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <Box>
        <Link to='/'>
          <img src={LogoSrc} alt='logo_bergamotta' />{" "}
        </Link>
        <TitleLogin title='Crie sua conta' />
        <form id='form' onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            <RadioGroupStyled color='secondary' row>
              <UserType
                value='user'
                text='Sou usu??rio'
                checked={!toggle}
                onChange={handleClick}
              ></UserType>
              <UserType
                value='owner'
                text='Sou restaurante'
                onChange={handleClick}
              ></UserType>
            </RadioGroupStyled>
            <FormControl fullWidth {...register("name", { required: true })}>
              <InputLogin
                label='Nome'
                type='text'
                placeholder='Digite seu usu??rio'
                name='name'
              />
              {errors.name && <p>Esse campo ?? obrigat??rio</p>}
            </FormControl>
            <FormControl fullWidth {...register("email", { required: true })}>
              <InputLogin
                label='Email'
                type='email'
                placeholder='Digite seu email'
                name='email'
              />
              {errors.email && <p>Esse campo ?? obrigat??rio</p>}
            </FormControl>
            <FormControl
              fullWidth
              {...register("password", { required: true })}
            >
              <InputLogin
                label='Senha'
                type='password'
                name='password'
                placeholder='Digite sua senha'
              />
              {errors.password && <p>Esse campo ?? obrigat??rio</p>}
            </FormControl>
            <FormControl
              fullWidth
              {...register("image_link", { required: true })}
            >
              <InputLogin
                label='Link da imagem'
                type='text'
                placeholder='Insira link da sua imagem de avatar'
                name='image_link'
              />
              {errors.image_link && <p>Esse campo ?? obrigat??rio</p>}
            </FormControl>
            <Container>
              <FormControl fullWidth {...register("city", { required: true })}>
                <InputLogin
                  label='Cidade'
                  type='text'
                  placeholder='Digite sua cidade'
                  name='city'
                />
                {errors.city && <p>Esse campo ?? obrigat??rio</p>}
              </FormControl>
              <FormControl fullWidth {...register("state", { required: true })}>
                <InputLogin
                  label='Estado'
                  type='text'
                  placeholder='Digite seu estado'
                  name='state'
                />
                {errors.state && <p>Esse campo ?? obrigat??rio</p>}
              </FormControl>
              <FormControl
                fullWidth
                {...register("country", { required: true })}
              >
                <InputLogin
                  label='Pa??s'
                  type='text'
                  placeholder='Digite o pa??s'
                  name='country'
                />
                {errors.country && <p>Esse campo ?? obrigat??rio</p>}
              </FormControl>
            </Container>
            {toggle && (
              <Container>
                <FormControl
                  fullWidth
                  {...register("cnpj", { required: true })}
                >
                  <InputLogin
                    label='CNPJ'
                    type='text'
                    placeholder='CNPJ'
                    name='cnpj'
                  />
                  {errors.cnpj && <p>Esse campo ?? obrigat??rio</p>}
                </FormControl>
                <FormControl
                  fullWidth
                  {...register("role", { required: true })}
                >
                  <InputLogin
                    label='Ocupa????o'
                    type='text'
                    placeholder='Ocupa????o'
                    name='role'
                  />
                  {errors.role && <p>Esse campo ?? obrigat??rio</p>}
                </FormControl>
              </Container>
            )}
          </Inputs>
          <SubmitButton text='Cadastro' />
        </form>
        <SignUpLink
          text='J?? possui cadastro?'
          href='/login'
          link='Fa??a login aqui'
        />
      </Box>
      <Footer></Footer>
    </div>
  );
}

export default SignUp;
