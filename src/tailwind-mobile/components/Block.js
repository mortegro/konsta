import React from 'react';
import { classNames } from '../shared/classnames';

const Block = (props) => {
  const {
    tag = 'div',
    className,
    colors: colorsProp,

    strong,
    inset,
    nested,

    // Theme
    ios,
    material,

    // Children
    children,

    // Rest
    ...rest
  } = props;

  const Component = tag;

  const attrs = {
    ...rest,
  };

  const theme = ios ? 'ios' : material ? 'material' : 'common';

  const colors = {
    strongBg: 'bg-white',
    ...colorsProp,
  };

  const c = {
    base: {
      initial: `px-4 ${!nested ? 'my-8' : ''} text-sm relative`,
      ios: ``,
      material: ``,
      common: ``,
    },
    strong: {
      initial: `py-4 ${colors.strongBg} ${
        !inset && !nested ? 'hairline-t hairline-b' : ''
      }`,
      ios: ``,
      material: ``,
      common: ``,
    },
    inset: {
      initial: `mx-4 overflow-hidden`,
      ios: `rounded-lg`,
      material: `rounded`,
      common: `ios:rounded-md material:rounded`,
    },
  };

  const classes = classNames([
    // base
    c.base.initial,
    c.base[theme],

    // strong
    strong && c.strong.initial,
    strong && c.strong[theme],

    // strong
    inset && c.inset.initial,
    inset && c.inset[theme],

    className,
  ]);

  return (
    <Component className={classes} {...attrs}>
      {children}
    </Component>
  );
};

export default Block;
