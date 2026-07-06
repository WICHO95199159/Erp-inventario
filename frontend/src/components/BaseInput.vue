<template>
  <div class="field">

    <label>{{ label }}</label>

    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :class="{ error }"
      :type="type"
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
    }
  }
}
</script>