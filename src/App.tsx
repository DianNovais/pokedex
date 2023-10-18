import "./App.css";

import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Input } from "antd";

import { useQuery } from "react-query";
import axios from "axios";

//components
import Nav from "./components/Nav/Nav";
import PokemonsCard from "./components/PokemonsCard/PokemonsCard";

const App: React.FC = () => {

  //interfaces

  interface ItemInterface {
    name: string,
    url: string
  }

  //Api call
  const { data, isLoading } = useQuery("pokemons", async () => {
    return axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
      .then((response) => response.data.results);
  });

  // const result = data.map(async(item) => {item})

  //antd components config
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { Search } = Input;

  const onSearch = (value: String) => {
    console.log(value);
  };


  return (
    <div className="appContainer">
      <Nav></Nav>

      {isLoading ? (
        <Spin indicator={antIcon} />
      ) : (
        <>
          <Search
            placeholder="Procure um pokemon"
            onSearch={onSearch}
            style={{ margin: "10px", width: "400px", color: "red" }}
            enterButton
          />

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{gap: '5px', justifyContent: 'center'}}>
            {data.map((item: ItemInterface) => (

              <Col className="gutter-row" span={4} key={item.name}>
                <PokemonsCard url={item.url}></PokemonsCard>
              </Col>

            ))}

            
          </Row>
        </>
      )}

    </div>
  );
};

export default App;
