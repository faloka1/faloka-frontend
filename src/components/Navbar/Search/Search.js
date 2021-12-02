import React from 'react';
import { NavLink, Form, InputGroup, Button, FormControl, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Search.scss';

import { ReactComponent as SearchIcon } from '../../SVG/search.svg';
import { ReactComponent as CameraIcon } from '../../SVG/camera.svg';
import CurrencyFormatter from '../../CurrencyFormatter/CurrencyFormatter';
import useProductsSearch from '../../../hooks/use-products-search';

const Search = ({ onOpenSearchModal, onVisualSearchClick }) => {
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

  return (
    <div className="position-relative">
      <NavLink as={Link} to="#" className="d-block d-xl-none">
        <SearchIcon onClick={onOpenSearchModal} className="icon" />
      </NavLink>
      <div className="d-none d-xl-block position-relative">
        <Form className="d-flex search-input">
          <InputGroup>
            <Button variant="primary" className="search-icon">
              <SearchIcon className="icon" />
            </Button>
            <FormControl
              type="text"
              placeholder="Search"
              onFocus={searchFocusHandler}
              onBlur={searchBlurHandler}
              onChange={searchChangeHandler}
              value={search}
            />
          </InputGroup>
        </Form>
        <CameraIcon className="icon visual-search-icon position-absolute top-50 end-0 translate-middle" color="#a1a1a1" onClick={onVisualSearchClick} />
      </div>
      {showSuggestion &&
        <ul
          onMouseOver={suggestionMouseOverHandler}
          onMouseOut={suggestionMouseOutHandler}
          className="search__suggestion position-absolute bg-white w-100 p-2 mt-1 border list-unstyled"
        >
          {isSearching && (
            <li className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </li>
          )}
          {!isSearching && products.length > 0 && products.map(p => (
            <li className="mb-2" key={p.slug}>
              <Link to={`/products/${p.slug}`} className="d-flex">
                <img className="flex-shrink-0 me-2" src={p.image} alt="product" />
                <div style={{ minWidth: '0' }}>
                  <p className="mb-0 text-truncate">{p.name}</p>
                  <CurrencyFormatter
                    value={p.price}
                    renderText={(value) => <p>{value}</p>}
                  />
                </div>
              </Link>
            </li>
          ))}
          {products.length === 0 && !isSearching &&
            <li>
              <p className="text-center text-muted mb-0">Produk tidak ditemukan</p>
            </li>
          }
        </ul>
      }
    </div>
  );
};

export default Search;