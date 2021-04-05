<template>
  <el-row>
    <el-col :span="20">
      <h4 id='business-name'>Slate &amp; Co</h4>
    </el-col>
    <el-col :span="2">
      <p id="username">John Doe</p>
      <a href="#" id="log-out">Log out</a>
    </el-col>
    <el-col :span="2">
      <div>
        <el-avatar icon="el-icon-user-solid" id="avatar"></el-avatar>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
#header {
  margin-top: 16px;
  margin-bottom: 16px;
}

#username {
  margin-bottom: 2px;
}

#avatar {
  margin-top: 16px;
  background-color: #FA7268;
}

#log-out {
  color: #FA7268;
  text-decoration: none;
}
</style>
