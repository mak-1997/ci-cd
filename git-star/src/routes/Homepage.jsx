import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Text,
  Grid,
  Image,
  VStack,
  GridItem,
} from "@chakra-ui/react";
import RepoPage from "./RepoPage";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [data, setData] = React.useState([]);
  const [page,setPage] = React.useState(1);
  const[loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    handleClick();
  }, [page]);

  // const navigate = useNavigate();

  const handlenextPage = (url) =>{
    // navigate("/repo")
    return  <RepoPage url={url}  /> 
  };

  const handlePageChange = (value) => {
    setPage(page + value);
  }

  const handleClick = async (value = "all") => {
    setLoading(true);
    let res = await axios.get(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${value}&page=${page}&per_page=10`
    );
    setLoading(false);
    setData(res.data.items);
    console.log(res.data.items);
  };

  if(loading){
    return <Text fontSize="4xl">Loading...</Text>
  }
  return (
    <Box>
      <Container display="flex" justifyContent={"space-evenly"}>
        <Button onClick={() => handleClick("all")}> All </Button>
        <Button onClick={() => handleClick("html")}> HTML </Button>
        <Button onClick={() => handleClick("css")}> CSS </Button>
        <Button onClick={() => handleClick("javascript")}> Javascript </Button>
      </Container>
      <Container display="flex" justifyContent={"space-evenly"} marginTop="3" >
        <Button  onClick={() => handlePageChange(-1)}> Prev </Button>
        <Text as="b" >{page} </Text>
        <Button onClick={() => handlePageChange(1)}> Next </Button>
      </Container>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap="10"
        margin="10"
      >
        {data.map((elem) => {
          return (
            <GridItem key={elem.id} boxShadow="md" padding={"5"}>
              <Box onClick={() => handlenextPage(elem.owner.url)}>
                <Image src={elem.owner.avatar_url} alt="avatar" />
                <VStack>
                  <Text as="b"> {elem.name} </Text>
                  <Text as="b"> {elem.language} </Text>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    padding="5px"
                    alignSelf={"base-line"}
                    border="1px solid"
                    width="100%"
                  >
                    <Text as="b" textAlign={"left"}>
                      {" "}
                      {elem.stargazers_count}{" "}
                    </Text>
                    <Text as="b" textAlign={"right"}>
                      {" "}
                      {elem.forks_count}{" "}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Homepage;
