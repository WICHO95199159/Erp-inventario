<template>
  <div class="layout">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  components: { Sidebar }
};
</script>

<style>
.layout {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>