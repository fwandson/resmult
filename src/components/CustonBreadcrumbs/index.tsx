import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { uniqueId } from 'lodash';
import { ReactNode } from 'react';

export interface CustonBreadcrumbsData {
  href?: string;
  label: string | ReactNode;
}

export interface CustonBreadcrumbsProps {
  links: CustonBreadcrumbsData[];
}

const CustonBreadcrumbs: React.FC<CustonBreadcrumbsProps> = (props) => {
  const { links } = props;

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {links.map((link, index) =>
        index === links.length - 1 ? (
          <Typography color="textPrimary">{link.label}</Typography>
        ) : (
          <Link key={uniqueId()} color="inherit" href={link.href}>
            {link.label}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default CustonBreadcrumbs;
