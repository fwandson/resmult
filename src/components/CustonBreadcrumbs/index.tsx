import { Breadcrumbs, Typography } from '@material-ui/core';
import { uniqueId } from 'lodash';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
          <Typography key={uniqueId()} variant="caption">
            {link.label}
          </Typography>
        ) : (
          <RouterLink key={uniqueId()} to={link.href}>
            <Typography variant="caption" color="textSecondary">
              {link.label}
            </Typography>
          </RouterLink>
        )
      )}
    </Breadcrumbs>
  );
};

export default CustonBreadcrumbs;
