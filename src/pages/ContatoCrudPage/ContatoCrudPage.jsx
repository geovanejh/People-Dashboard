import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContatoForm from "../../components/ContatoForm/ContatoForm";
import { FormContainer } from "../../components/Form/FormContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { usersApi } from "../../api";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";

const ContatoCrudPage = () => {
  const navigate = useNavigate();
  const [contato, setContato] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname: caminho } = useLocation();
  const { id } = useParams();

  const setup = async () => {
    if (caminho.includes("/idContato")) {
      try {
        const { data } = await usersApi.get(`/contato`);
        console.log("id: ", id);
        console.log("data: ", data);
        const achei = data.find((e) => e.idContato == id);
        console.log("achei: ", achei);
        formik.setFieldValue("tipoContato", achei.tipoContato);
        formik.setFieldValue("telefone", achei.telefone);
        formik.setFieldValue("descricao", achei.descricao);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    setup();
  }, []);

  const handleCreate = async (values) => {
    setLoading(true);
    try {
      await usersApi.post(`/contato/${id}`, values);
      toast.success("Contato cadastrado com sucesso!");
      navigate(-1);
    } catch (error) {
      toast.error("Um erro aconteceu, tente novamente.");
    }
    setLoading(false);
  };

  const handleUpdateContact = async (values) => {
    setLoading(true);
    try {
      await usersApi.put(`/contato/${id}`, values);
      toast.success("Contato alterado com sucesso!");
      navigate(-1);
    } catch (error) {
      toast.error("Um erro aconteceu, tente novamente.");
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      tipoContato: "",
      telefone: "",
      descricao: "",
    },
    validationSchema: Yup.object({
      tipoContato: Yup.string().required("- Obrigatório.").min(1, "- Obrigatório"),
      telefone: Yup.string().required("- Obrigatório."),
    }),
    onSubmit: (values) => {
      const newObj = {};
      alert(JSON.stringify(values));
      caminho.includes("/idPessoa") ? handleCreate(values) : handleUpdateContact(values);
    },
  });
  return loading ? (
    <Loading />
  ) : (
    <FormContainer>
      <button onClick={() => navigate(-1)}>voltar</button>
      <ContatoForm formik={formik} contato={contato} />
    </FormContainer>
  );
};
export default ContatoCrudPage;
