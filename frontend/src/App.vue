<template>

  <div class="layout">

    <Sidebar />

    <div class="content">

      <router-view />

    </div>

    <!-- ======================================
         AURORA CORE
    ======================================= -->

    <AuroraModal />

  </div>

</template>

<script>

import Sidebar from "./components/Sidebar.vue";
import AuroraModal from "./core/aurora/components/AuroraModal.vue";

export default {

  components: {

    Sidebar,

    AuroraModal

  }

};

</script>

<style>

html,
body{

  height:100%;

  overflow:auto;

}

.layout{

  display:flex;

}

.content{

  flex:1;

  padding:20px;

  overflow:auto;

}

</style>