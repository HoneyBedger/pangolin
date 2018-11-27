import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderContainer from './HeaderContainer';
import { InputGroup, SearchInput, ButtonPrimary,
  ButtonInvisible } from '../Form/Elements';

class ContactsHeader extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    console.log('Header just mounted');
  }

  search() {
    if(this.searchInput)
      this.props.searchExistingContacts(this.searchInput.value);
  }

  render(props) {
    return (
      <HeaderContainer>
        <InputGroup>
          <SearchInput placeholder='Search Contacts'
            ref={(input) => this.searchInput = input}
            onChange={this.search}/>
          <ButtonPrimary onClick={this.search}>
            <FontAwesomeIcon icon='search' />
          </ButtonPrimary>
        </InputGroup>
        <ButtonInvisible style={{flex: '1 0 auto'}}
          onClick={() => this.props.showModal('ADD_CONTACT')}>
          <FontAwesomeIcon icon='plus'/> Add
        </ButtonInvisible>
      </HeaderContainer>
    );
  }

}

export default ContactsHeader;
