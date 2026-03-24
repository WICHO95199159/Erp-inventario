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

html, body {
  height: 100%;
  overflow: auto; /* ✅ permite scroll */
}

.layout {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto; /* ✅ scroll interno si crece */
}

</style>