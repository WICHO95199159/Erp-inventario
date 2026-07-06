<template>
  <div class="field">

    <label>{{ label }}</label>

    <!-- TEXTAREA -->
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :class="{ error }"
      :rows="rows"
      :placeholder="placeholder"
    ></textarea>

    <!-- INPUT -->
    <input
      v-else
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :class="{ error }"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
    />

    <span
      v-if="error"
      class="error-message"
    >
      {{ error }}
    </span>

  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },

    modelValue: {
      type: [String, Number],
      default: ""
    },

    error: {
      type: String,
      default: ""
    },

    disabled: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: "text"
    },

    placeholder: {
      type: String,
      default: ""
    },

    rows: {
      type: Number,
      default: 4
    },

    min: {
      type: [String, Number],
      default: null
    },

    max: {
      type: [String, Number],
      default: null
    },

    step: {
      type: [String, Number],
      default: null
    }
  }
};
</script>