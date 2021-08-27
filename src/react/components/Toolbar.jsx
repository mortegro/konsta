import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { cls } from '../shared/cls.js';
import { positionClass } from '../shared/position-class.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';

const Toolbar = forwardRef((props, ref) => {
  const {
    component = 'div',
    className,
    colors: colorsProp,
    translucent = true,

    bgClassName = '',
    innerClassName = '',

    hairlines = true,

    tabbar,
    tabbarLabels,

    top,

    ios,
    material,

    children,
    ...rest
  } = props;

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const Component = component;

  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const attrs = {
    ...rest,
  };

  const colors = {
    bgIos: cls('bg-bars-ios-light', dark('dark:bg-bars-ios-dark')),
    bgMaterial: cls(
      'bg-bars-material-light',
      dark('dark:bg-bars-material-dark')
    ),
    ...colorsProp,
  };

  const c = themeClasses(
    {
      base: {
        common: `w-full ${positionClass('relative', className)} z-20`,
        toolbar: {
          ios: 'h-11',
          material: 'h-12',
        },
        tabbarLabels: {
          ios: 'h-12.5',
          material: 'h-14',
        },
      },
      bg: {
        common: cls('absolute w-full h-full left-0 top-0', bgClassName),
        ios: cls(
          hairlines && (top ? 'hairline-b' : 'hairline-t'),
          colors.bgIos,
          translucent && 'translucent'
        ),
        material: cls(
          `shadow-md ${colors.bgMaterial}`,
          !top && 'transform rotate-180'
        ),
      },
      inner: {
        common: cls(
          `flex relative justify-between items-center w-full h-full overflow-hidden`,
          innerClassName
        ),
        ios: 'px-2',
        material: !tabbar ? 'px-2' : '',
      },
    },
    className
  );

  return (
    <Component
      ref={elRef}
      className={c.base[tabbar && tabbarLabels ? 'tabbarLabels' : 'toolbar']}
      {...attrs}
    >
      <div className={c.bg} />
      <div className={c.inner}>{children}</div>
    </Component>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
