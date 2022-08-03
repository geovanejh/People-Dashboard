import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usersApi } from "../../api";
import { toast } from "react-hot-toast";
import ListPageHeader from "../../components/ListPages/ListPageHeader/ListPageHeader";
import { ListPage } from "../../components/ListPages/ListPage";
import EnderecoListItem from "../../components/EnderecoListItem/EnderecoListItem";
import { ListPageContainer } from "../../components/ListPages/ListPageContainer";
import Loading from "../../components/Loading/Loading";
import { PageContainer } from "./DetalhesPessoa.styled";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "../../components/Button/Button.styled";

const DetalhesPessoa = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pessoa, setPessoa] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(pessoa);

  const setup = async () => {
    getData();
  };

  const getData = async () => {
    try {
      const { data } = await usersApi.get(`https://dbc-pessoa-api.herokuapp.com/pessoa/lista-completa?idPessoa=${id}`);
      setPessoa(data[0]);
    } catch (error) {
      toast.error("Um erro aconteceu, tente novamente.");
    }
    setLoading(false);
  };

  useEffect(() => {
    setup();
  }, []);

  const handleEditContact = async (idRecebido) => {
    navigate(`/contato/form/idContato=${idRecebido}`);
  };

  const handleEdit = async (idRecebido) => {
    navigate(`/endereco/form/idEndereco=${idRecebido}`);
  };

  const deletaContato = async (idRecebido) => {
    setLoading(true);
    try {
      await usersApi.delete(`/contato/${idRecebido}`);
      getData();
      toast.success("Contato deletado com sucesso.");
    } catch (error) {
      toast.error("Um erro aconteceu, tente novamente.");
    }
    setLoading(false);
  };

  const deletaEndereco = async (idRecebido) => {
    setLoading(true);
    try {
      await usersApi.delete(`/endereco/${idRecebido}`);
      getData();
      toast.success("Endereço deletado com sucesso.");
    } catch (error) {
      toast.error("Um erro aconteceu, tente novamente.");
    }
    setLoading(false);
  };

  const handleDelete = async (idRecebido, dois) => {
    console.log(dois);
    confirmAlert({
      title: "Confirmar exclusão",
      message: "Você realmente deseja deletar?",
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            dois === "endereco" ? deletaEndereco(idRecebido) : deletaContato(idRecebido);
          },
        },
        {
          label: "Não",
        },
      ],
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <ListPage>
      <ListPageHeader title="Endereços" user="Geovane Hartmann" />
      <PageContainer>
        <div>
          <h1>{pessoa.nome}</h1>
          <h4>{pessoa.email}</h4>
          <h4>{pessoa.cpf}</h4>
          <h4>{pessoa.dataNascimento}</h4>
        </div>
      </PageContainer>
      <ListPageContainer layout="1fr 0.5fr 1fr 0.5fr 1fr 0.5fr">
        <div>
          <h2> Endereços: </h2>
          <Button primary onClick={() => navigate(`/endereco/form/idPessoa=${id}`)}>
            Cadastrar
          </Button>
        </div>
        {pessoa.enderecos.length <= 0 ? (
          <div>Este usuário não possui nenhum endereço cadastrado.</div>
        ) : (
          <ul>
            <li>
              <h3>Rua</h3>
              <h3>Número</h3>
              <h3>Cidade</h3>
              <h3>Estado</h3>
              <h3>CEP</h3>
              <h3></h3>
            </li>

            {pessoa &&
              pessoa.enderecos.map((e, i) => (
                <EnderecoListItem
                  layout="1fr 0.5fr 1fr 0.5fr 1fr 0.5fr"
                  id={e.idEndereco}
                  key={i}
                  rua={e.logradouro}
                  cidade={e.cidade}
                  estado={e.estado}
                  numero={e.numero}
                  cep={e.cep}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  tipo="endereco"
                />
              ))}
          </ul>
        )}
      </ListPageContainer>
      <ListPageContainer layout="1fr 1fr 1fr">
        <div>
          <h2> Contatos: </h2>
          <Button primary onClick={() => navigate(`/contato/form/idPessoa=${id}`)}>
            Cadastrar
          </Button>
        </div>
        {pessoa.contatos.length <= 0 ? (
          <div>Este usuário não possui nenhum contato cadastrado.</div>
        ) : (
          <ul>
            <li>
              <h3>Tipo</h3>
              <h3>Número</h3>
              <h3>Descrição</h3>
            </li>

            {pessoa &&
              pessoa.contatos.map((e, i) => (
                <EnderecoListItem
                  layout="1fr 1fr 1fr 1fr 1fr 1fr"
                  id={e.idContato}
                  key={i}
                  rua={e.tipoContato}
                  cidade={e.telefone}
                  cep={e.descricao}
                  handleEdit={handleEditContact}
                  handleDelete={handleDelete}
                  tipo="contato"
                />
              ))}
          </ul>
        )}
      </ListPageContainer>
    </ListPage>
  );
};
export default DetalhesPessoa;
