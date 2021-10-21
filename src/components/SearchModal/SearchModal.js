import React from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';
import { ReactComponent as SearchIcon } from '../SVG/search.svg';

import './SearchModal.scss';

const SearchModal = ({ ...props }) => {
  return (
    <Modal className="search-modal" backdropClassName="search-backdrop" {...props}>
        <InputGroup className="mb-3">
            <FormControl placeholder="Search" aria-label="Search"/>
            <Button variant="outline-light" >
                <SearchIcon className="icon" />
            </Button>
        </InputGroup>
    </Modal>
  );
};

export default SearchModal;