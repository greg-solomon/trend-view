import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Search from "./components/Search/Search";
import View from "./components/View/View";
import Header from "./components/Header";
import InfoModal from "./components/InfoModal";

const App = () => {
  const [toggleInfo, setToggleInfo] = useState(false);
  const client = new ApolloClient({
    uri: `/graphql`
  });

  const fade = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 }
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <AppWrapper className="App" style={fade}>
          <Header />
          <Route
            exact
            path="/"
            render={props => (
              <Search
                {...props}
                setToggleInfo={setToggleInfo}
                toggleInfo={toggleInfo}
              />
            )}
          />
          {toggleInfo && (
            <InfoModal setToggleInfo={setToggleInfo} toggleInfo={toggleInfo} />
          )}
          <Route path="/trends/:id" component={View} />
        </AppWrapper>
      </Router>
    </ApolloProvider>
  );
};

const AppWrapper = styled(animated.div)`
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  min-height: 100vh;
`;

export default App;
