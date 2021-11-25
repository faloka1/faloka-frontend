import React from 'react';
import { Modal, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './SearchModal.scss';

import useProductsSearch from '../../hooks/use-products-search';
import { ReactComponent as SearchIcon } from '../SVG/search.svg';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';

const SearchModal = ({ onHide, ...props }) => {
  const {
    search,
    isSearching,
    products,
    searchBlurHandler,
    searchChangeHandler,
    searchFocusHandler,
    showSuggestion,
    suggestionMouseOutHandler,
    suggestionMouseOverHandler
  } = useProductsSearch();

  const listClickHandler = () => {
    onHide();
  };

  return (
    <Modal className="search-modal" backdropClassName="search-backdrop" onHide={onHide} {...props}>
      <div className="position-relative">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search"
            aria-label="Search"
            onFocus={searchFocusHandler}
            onBlur={searchBlurHandler}
            onChange={searchChangeHandler}
            value={search}
          />
          <Button variant="outline-light" >
            <SearchIcon className="icon" />
          </Button>
        </InputGroup>
        {showSuggestion &&
          <ul
            onMouseOver={suggestionMouseOverHandler}
            onMouseOut={suggestionMouseOutHandler}
            className="position-absolute text-white w-100 p-2 mt-1 list-unstyled"
          >
            {isSearching &&
              <li className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </li>
            }
            {!isSearching && products.length === 0 &&
              <li>
                <p className="fs-3 text-center">Produk tidak ditemukan</p>
              </li>
            }
            {!isSearching && products.length > 0 && products.map(p => (
              <li key={p.slug} className="search_modal__suggestion" onClick={listClickHandler}>
                <Link className="d-flex" to={`/products/${p.slug}`}>
                  <img className="me-3" src={p.image} alt="product" style={{ width: '7rem' }} />
                  <div>
                    <p className="fs-4">{p.name}</p>
                    <CurrencyFormatter value={p.price} renderText={(value) => <p className="fs-4 mb-0">{value}</p>} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        }
      </div>
    </Modal>
  );
};

export default SearchModal;