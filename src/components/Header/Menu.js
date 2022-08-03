import Item from "./Item";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { MenuNav } from "./Menu.styled";
import { BiCurrentLocation } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { RiContactsFill } from "react-icons/ri";

const Menu = () => {
  const { handleLogout, auth } = useContext(AuthContext);
  const { pathname: caminho } = useLocation();

  return (
    <MenuNav>
      <ul>
        {!auth ? (
          <>
            <Item name="Login" url="/" />
            <Item name="Cadastrar usuários" url="/users" />
          </>
        ) : (
          <>
            {/* <Item
              name="Contatos"
              url="/contato"
              icon={<RiContactsFill />}
              active={caminho.includes("/contato") ? "active" : ""}
            /> */}
            <Item
              name="Endereços"
              url="/endereco"
              icon={<BiCurrentLocation />}
              active={caminho.includes("/endereco") ? "active" : ""}
            />
            <Item
              name="Pessoas"
              url="/people"
              icon={<IoPerson />}
              active={caminho.includes("/people") ? "active" : ""}
            />
            <li>
              <button onClick={handleLogout}>
                <MdLogout />
                <p>Sair</p>
              </button>
            </li>
          </>
        )}
      </ul>
    </MenuNav>
  );
};
export default Menu;
