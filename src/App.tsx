import "./App.css";

import { Col, Flex, Pagination, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Input } from "antd";

import { useQuery } from "react-query";
import axios from "axios";

//components
import Nav from "./components/Nav/Nav";
import PokemonsCard from "./components/PokemonsCard/PokemonsCard";

//hooks
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [pageInfo, setPageInfo] = useState<number>(1);
  const [pageSizeInfo, setPageSizeInfo] = useState<number>(10);

 


  //interfaces

  interface ItemInterface {
    name: string;
    url: string;
  }

  //Api call
  const { data: totalPokemons } = useQuery("pokemons", async () => {
    return axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${pageSizeInfo}&offset=${
          (pageInfo - 1) * pageSizeInfo
        }`
      )
      .then((response) => response.data.count);
  });

  const {
    data: dataPokemons,
    refetch,
    isLoading,
  } = useQuery("pokemonsdata", async () => {
    return axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${pageSizeInfo}&offset=${
          (pageInfo - 1) * pageSizeInfo
        }`
      )
      .then((response) => response.data.results);
  });

  useEffect(() => {
    refetch();
    console.log(dataPokemons);
  }, [pageInfo]);

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
        <Flex
          align="center"
          justify="center"
          style={{ width: "100%", height: "80vh" }}
        >
          <Spin indicator={antIcon} />
        </Flex>
      ) : (
        <>
          <Search
            placeholder="Procure um pokemon"
            onSearch={onSearch}
            style={{ margin: "10px", width: "400px", color: "red" }}
            enterButton
          />

          <Row
            gutter={[10, 24]}
            style={{ justifyContent: "center", marginLeft: 0 }}
          >
            {dataPokemons.map((item: ItemInterface) => (
              <Col
                key={item.name}
                xs={12}
                sm={7}
                md={8}
                lg={6}
                xl={4}
                xxl={3}
                className="gutter-row"
                span={2}
                style={{ padding: "0", width: "200px" }}
              >
                <PokemonsCard url={item.url}></PokemonsCard>
              </Col>
            ))}
          </Row>

          <Flex style={{ margin: "10px 0" }} justify="center" align="center">
            <Pagination
              defaultCurrent={1}
              total={totalPokemons}
              onChange={(page, pageSize) => {
                setPageInfo(page);
                setPageSizeInfo(pageSize);
              }}
            />
          </Flex>

          
        </>
      )}
    </div>
  );
};

export default App;
