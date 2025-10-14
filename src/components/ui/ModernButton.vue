<template>
  <button
    :class="[
      'modern-btn',
      `modern-btn--${variant}`,
      `modern-btn--${size}`,
      {
        'modern-btn--loading': loading,
        'modern-btn--disabled': disabled,
        'modern-btn--icon-only': iconOnly,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <div v-if="loading" class="modern-btn__spinner">
      <div class="spinner"></div>
    </div>

    <n-icon v-if="icon && !loading" :size="iconSize" class="modern-btn__icon">
      <component :is="icon" />
    </n-icon>

    <span v-if="!iconOnly && !loading" class="modern-btn__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: any;
  iconOnly?: boolean;
}

interface Emits {
  click: [event: MouseEvent];
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  iconOnly: false,
});

const emit = defineEmits<Emits>();

const iconSize = computed(() => {
  const sizes = { sm: 16, md: 20, lg: 24 };
  return sizes[props.size];
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.modern-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid var(--vintage-brown);
  border-bottom: 3px solid var(--vintage-brown);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Crimson Text', serif;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0.3px;
  box-shadow:
    1px 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.modern-btn:focus-visible {
  outline: 2px solid var(--sepia);
  outline-offset: 2px;
}

/* Sizes */
.modern-btn--sm {
  height: 34px;
  padding: 0 18px;
  font-size: 14px;
}

.modern-btn--md {
  height: 42px;
  padding: 0 24px;
  font-size: 16px;
}

.modern-btn--lg {
  height: 50px;
  padding: 0 28px;
  font-size: 18px;
}

.modern-btn--icon-only {
  aspect-ratio: 1;
  padding: 0;
}

/* Variants */
.modern-btn--primary {
  background: var(--deep-burgundy);
  color: var(--antique-cream);
  border-color: var(--sepia);
  box-shadow:
    2px 2px 0 rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.modern-btn--primary:hover:not(.modern-btn--disabled):not(.modern-btn--loading) {
  transform: translateY(-1px);
  background: var(--sepia);
  box-shadow:
    2px 3px 0 rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.modern-btn--secondary {
  background: var(--aged-paper);
  color: var(--ink-black);
  border-color: var(--vintage-brown);
}

.modern-btn--secondary:hover:not(.modern-btn--disabled):not(.modern-btn--loading) {
  background: var(--parchment);
  transform: translateY(-1px);
}

.modern-btn--ghost {
  background: transparent;
  color: var(--vintage-brown);
  border-color: var(--vintage-brown);
  box-shadow: none;
}

.modern-btn--ghost:hover:not(.modern-btn--disabled):not(.modern-btn--loading) {
  background: rgba(139, 115, 85, 0.1);
  border-color: var(--sepia);
}

.modern-btn--danger {
  background: var(--deep-burgundy);
  color: var(--antique-cream);
  border-color: var(--deep-burgundy);
  box-shadow:
    2px 2px 0 rgba(92, 58, 58, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.modern-btn--danger:hover:not(.modern-btn--disabled):not(.modern-btn--loading) {
  transform: translateY(-1px);
  background: #4a2828;
  box-shadow:
    2px 3px 0 rgba(92, 58, 58, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* States */
.modern-btn--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05) !important;
}

.modern-btn--loading {
  cursor: not-allowed;
  color: transparent;
}

.modern-btn__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(139, 115, 85, 0.2);
  border-top: 2px solid var(--vintage-brown);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.modern-btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-btn__text {
  font-weight: inherit;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Active state */
.modern-btn:active:not(.modern-btn--disabled):not(.modern-btn--loading) {
  transform: translateY(1px);
  box-shadow:
    1px 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Texture overlay */
.modern-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.02) 2px,
    rgba(0, 0, 0, 0.02) 4px
  );
  pointer-events: none;
}
</style>
