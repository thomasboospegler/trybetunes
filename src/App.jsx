import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    userName: '',
    loading: false,
    loggedIn: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { userName } = this.state;
      await createUser({ name: userName });
      this.setState({
        loading: false,
        loggedIn: true,
      });
    });
  }

  render() {
    const { userName, loading, loggedIn } = this.state;
    return (
      <div>
        {loggedIn && <Redirect to="/search" />}
        <Switch>
          <Route
            exact
            path="/"
            render={ (propsRouter) => (
              !loading ? <Login
                { ...propsRouter }
                userName={ userName }
                name="userName"
                onChange={ this.handleChange }
                onSubmit={ this.handleSubmit }
              /> : <Loading />
            ) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
