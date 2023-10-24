import "./App.css";

import { Col, Flex, Pagination, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Input } from "antd";


import axios from "axios";

//components
import Nav from "./components/Nav/Nav";
import PokemonsCard from "./components/PokemonsCard/PokemonsCard";
import ModalCustom from "./components/Modal/ModalCustom";

//hooks
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const App: React.FC = () => {
  const [pageInfo, setPageInfo] = useState<number>(1);
  const [pageSizeInfo, setPageSizeInfo] = useState<number>(10);
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
  }, [pageInfo]);



  const [filter, setFilter] = useState<string>();

  const { data: searchQueryData, refetch: searchRefresh, isLoading: searchLoading } = useQuery(
    ["search", filter],
    async () => {
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${filter}`)
        .then((response) => {
          return response.data;
        });
    },
    { enabled: Boolean(filter), onSuccess: () => {setSearchModal(true), setError('')}, onError: () => {setError('Não foi encontrado o pokemon')} }
  );

  //antd components config
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { Search } = Input;

  const onSearch = (value: string) => {
    setFilter(value.toLowerCase());
    if(searchQueryData){
      searchRefresh();
    }
  };

  const hideModal = (): void => {
    setSearchModal(false);
  }

  return (
    <div className="appContainer">
      <Nav></Nav>

      {isLoading || searchLoading ? (
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
          {error && <p style={{color: 'red', margin: '10px'}}>{error}</p>}

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

         

          {searchModal && (
            <>
              <ModalCustom data={searchQueryData} enable={true} hideModal={hideModal}/>
            </>
            
          )}

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
