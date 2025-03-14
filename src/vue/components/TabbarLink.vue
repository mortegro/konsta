<template>
  <k-link
    tabbar
    :tabbar-active="active"
    :component="component"
    :colors="colors"
    :touch-ripple="touchRipple"
  >
    <span :class="c.content">
      <template v-if="slots.icon">
        <span :class="c.iconContainer">
          <span :class="c.iconBg" />
          <slot name="icon" />
        </span>
      </template>
      <template v-if="label || slots.label || slots.default">
        <span :class="c.label">
          {{ label }}
          <slot name="label" />
          <slot />
        </span>
      </template>
    </span>
  </k-link>
</template>
<script>
  import { computed, ref, onBeforeUpdate } from 'vue';
  import { TabbarLinkClasses } from '../../shared/classes/TabbarLinkClasses.js';
  import { TabbarLinkColors } from '../../shared/colors/TabbarLinkColors.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import kLink from './Link.vue';

  export default {
    name: 'k-tabbar-link',
    components: {
      kLink,
    },
    props: {
      component: {
        type: String,
        default: 'a',
      },
      colors: {
        type: Object,
      },
      touchRipple: { type: Boolean, default: true },
      active: {
        type: Boolean,
        default: false,
      },
      label: { type: String, default: undefined },
    },
    setup(props, ctx) {
      const colors = computed(() =>
        TabbarLinkColors(props.colors, useDarkClasses)
      );
      const hasIcon = ref(ctx.slots.icon);
      const hasLabel = ref(props.label || ctx.slots.label || ctx.slots.default);
      const c = useThemeClasses(props, () =>
        TabbarLinkClasses(
          {
            active: props.active,
            hasIcon: hasIcon.value,
            hasLabel: hasLabel.value,
          },
          colors.value
        )
      );
      onBeforeUpdate(() => {
        hasIcon.value = ctx.slots.icon;
        hasLabel.value = props.label || ctx.slots.label || ctx.slots.default;
      });
      return {
        c,
        slots: ctx.slots,
      };
    },
  };
</script>
