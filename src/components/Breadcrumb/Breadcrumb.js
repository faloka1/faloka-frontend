import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb as BsBreadcrumb } from 'react-bootstrap';

const Breadcrumb = ({ breadcrumbData, ...props }) => {
  return (
    <BsBreadcrumb {...props}>
      {breadcrumbData.map((b, i) => {
        if (Array.isArray(b)) {
          const items = b.map((bSub, index) => {
            if (index < b.length - 1) {
              return (
                <React.Fragment key={bSub.path.to + index}>
                  <Link
                    to={{
                      pathname: bSub.path.to,
                      search: bSub.path.search
                    }}
                  >
                    {bSub.label}
                  </Link>
                  <span> . </span>
                </React.Fragment>
              );
            } else {
              return (
                <Link
                  key={bSub.path.to + index}
                  to={{
                    pathname: bSub.path.to,
                    search: bSub.path.search
                  }}
                >
                  {bSub.label}
                </Link>
              )
            }
          });

          return (
            <BsBreadcrumb.Item key={i} linkAs={'span'}>
              {items}
            </BsBreadcrumb.Item>
          )
        } else {
          return (
            <BsBreadcrumb.Item
              key={`${b.path.to}${b.path.search}`}
              linkAs={Link}
              linkProps={{
                to: {
                  pathname: b.path.to,
                  search: b.path.search
                }
              }}
              active={b.active}>
              {b.label}
            </BsBreadcrumb.Item>
          )
        }
      })}
    </BsBreadcrumb>
  );
};

export default Breadcrumb;