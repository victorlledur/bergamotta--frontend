import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import InputLogin from "../../components/InputLogin";
import SubmitButton from "../../components/SubmitButton";
import { byIdPlace, updatePlace } from "../../services/MainApi/place";
import { useOwner } from "../../store/modules/owner";
import { Column, Container, Wrapper } from "./styles";

interface Place {
  name: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  district: string;
  street: string;
  place_number: string;
  complement: string;
  image_link: string;
  capacity: number;
  description: string;
  phone: string;
  average_ticket_price: string;
  social_media: string;
  opening_hours: string;
  payment: string;
}

function ConfigPlace() {
  const urlPlaceId = window.location.pathname.split("/")[2];

  const ownerData = useOwner();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [owner_id, setOwnerId] = useState<string>("");
  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    if (ownerData.isLogged) {
      setOwnerId(ownerData.findOwner.id);
      const getData = async () => {
        try {
          const response = await byIdPlace(urlPlaceId);
          setPlace(response.data);
        } catch (error) {
          alert("Deu algo errado no catch");
        }
      };
      getData();
    }
  }, [urlPlaceId, ownerData]);

  const onSubmit = (data: any) => {
    if (data.name === "") {
      data.name = place?.name;
    }
    if (data.city === "") {
      data.city = place?.city;
    }
    if (data.state === "") {
      data.state = place?.state;
    }
    if (data.country === "") {
      data.country = place?.country;
    }
    if (data.zipcode === "") {
      data.zipcode = place?.zipcode;
    }
    if (data.district === "") {
      data.district = place?.district;
    }
    if (data.street === "") {
      data.street = place?.street;
    }
    if (data.place_number === "") {
      data.place_number = place?.place_number;
    }
    if (data.complement === "") {
      data.complement = place?.complement;
    }
    if (data.image_link === "") {
      data.image_link = place?.image_link;
    }
    if (data.capacity === "") {
      data.capacity = place?.capacity;
    }
    if (data.description === "") {
      data.description = place?.description;
    }
    if (data.phone === "") {
      data.phone = place?.phone;
    }
    if (data.average_ticket_price === "") {
      data.average_ticket_price = place?.average_ticket_price;
    }
    if (data.social_media === "") {
      data.social_media = place?.social_media;
    }
    if (data.opening_hours === "") {
      data.opening_hours = place?.opening_hours;
    }
    if (data.payment === "") {
      data.payment = place?.payment;
    }
    placeUpdate(
      data.name,
      data.city,
      data.state,
      data.country,
      data.zipcode,
      data.district,
      data.street,
      data.place_number,
      data.complement,
      data.image_link,
      data.capacity,
      data.description,
      data.phone,
      data.average_ticket_price,
      data.social_media,
      data.opening_hours,
      data.payment,
      owner_id,
      urlPlaceId
    );
  };

  const placeUpdate = async (
    name: string,
    city: string,
    state: string,
    country: string,
    zipcode: string,
    district: string,
    street: string,
    place_number: string,
    complement: number,
    image_link: string,
    capacity: number,
    description: string,
    phone: string,
    average_ticket_price: string,
    social_media: string,
    opening_hours: string,
    payment: string,
    owner_id: string,
    place_id: string
  ) => {
    const req = {
      name: name,
      city: city,
      state: state,
      country: country,
      zipcode: zipcode,
      district: district,
      street: street,
      place_number: place_number,
      complement: complement,
      image_link: image_link,
      capacity: capacity,
      description: description,
      phone: phone,
      average_ticket_price: average_ticket_price,
      social_media: social_media,
      opening_hours: opening_hours,
      payment: payment,
      owner_id: owner_id,
      place_id: place_id,
    };
   
    try {
      const response = await updatePlace(req);
     
      navigate("/");
    } catch (error) {
      
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
          <Column>
            <img src={place?.image_link} alt='Imagem do estabelecimento' />
            <h2>{place?.name}</h2>
            <InputLogin
              label='Nome do estabelecimento'
              theme='signin'
              type='text'
              defaultValue={place?.name}
              placeholder='Digite o estabelecimento'
              {...register("name")}
            />
            <InputLogin
              label='Link imagem'
              theme='signin'
              type='text'
              defaultValue={place?.image_link}
              placeholder='Link da imagem do estabelecimento'
              {...register("image_link")}
            />
            <Container>
              <InputLogin
                label='Telefone'
                theme='text'
                defaultValue={place?.phone}
                type='text'
                placeholder='Digite seu telefone para contato'
                {...register("phone")}
              />
              <InputLogin
                label='M??dia social'
                theme='text'
                defaultValue={place?.social_media}
                type='text'
                placeholder='Digite seu link do Instagram'
                {...register("social_media")}
              />
            </Container>
            <InputLogin
              label='Hor??rio de funcionamento'
              theme='signin'
              defaultValue={place?.opening_hours}
              type='text'
              placeholder='Digite o hor??rio'
              {...register("opening_hours")}
            />
          </Column>
          <Column>
            <InputLogin
              label='Rua'
              theme='signin'
              type='text'
              defaultValue={place?.street}
              placeholder='Digite a rua do seu endere??o'
              {...register("street")}
            />
            <Container>
              <InputLogin
                label='N??mero'
                theme='signin'
                type='text'
                defaultValue={place?.place_number}
                placeholder='Digite o n??mero do endere??o'
                {...register("place_number")}
              />
              <InputLogin
                label='Complemento'
                theme='signin'
                type='text'
                defaultValue={place?.complement}
                placeholder='Digite o complemento'
                {...register("complement")}
              />
              <InputLogin
                label='CEP'
                theme='signin'
                defaultValue={place?.zipcode}
                type='text'
                placeholder='Digite seu CEP'
                {...register("zipcode")}
              />
            </Container>
            <Container>
              <InputLogin
                label='Bairro'
                theme='signin'
                defaultValue={place?.district}
                type='text'
                placeholder='Digite seu bairro'
                {...register("district")}
              />
              <InputLogin
                label='Cidade'
                theme='signin'
                defaultValue={place?.city}
                type='text'
                placeholder='Digite sua cidade'
                {...register("city")}
              />
              <InputLogin
                label='Estado'
                theme='signin'
                defaultValue={place?.state}
                type='text'
                placeholder='Digite seu estado'
                {...register("state")}
              />
              <InputLogin
                label='Pa??s'
                theme='signin'
                defaultValue={place?.country}
                type='text'
                placeholder='Digite seu pa??s'
                {...register("country")}
              />
            </Container>
            <Container>
              <InputLogin
                label='Ticket m??dio'
                type='text'
                defaultValue={place?.average_ticket_price}
                placeholder='Digite o valor'
                theme='signin'
                {...register("average_ticket_price")}
              />
              <InputLogin
                label='Formas de pagamento'
                type='text'
                defaultValue={place?.payment}
                placeholder='Digite o valor'
                theme='signin'
                {...register("payment")}
              />
              <InputLogin
                label='Capacidade'
                type='number'
                defaultValue={place?.capacity}
                placeholder='Digite a lota????o'
                theme='signin'
                {...register("capacity")}
              />
            </Container>
            <InputLogin
              label='Descri????o'
              theme='description'
              defaultValue={place?.description}
              type='text'
              placeholder='Digite um breve texto de apresenta????o'
              {...register("description")}
            />
            <SubmitButton text='Salvar altera????es' />
          </Column>
        </form>
      </Wrapper>
      <Footer />
    </>
  );
}
export default ConfigPlace;
