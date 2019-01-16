<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">

    <div v-if="message"
      :class="`message ${error ? 'is-danger' : 'is-success'}`">
      <div class="message-body">
        {{message}}
      </div>
    </div>

    <div class="field">
      <div class="file is-boxed is-primary">
        <label class="file-label">
          <input
            type="file"
            ref="files"
            class="file-input"
            @change="selectFiles"
          />

          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Upload
            </span>
          </span>

          <span v-if="files" class="file-name">{{ files.name }}</span>

        </label>
      </div>

    </div>

    <div class="field">
      <button class="button is-info">
        Send
      </button>
    </div>

  </form>
</template>

<script>
// import axios from 'axios';

export default {
  name: "Upload",

  data() {
    return {
      files: "",
      message: "",
      error: false,
    }
  },

  methods: {
    selectFiles() {
      this.files = this.$refs.files.files[0];
      this.error = false;
      this.message = "";
    },

    async sendFile() {
      const formData = new FormData();
      formData.append('files', this.files);

      try {
        await fetch('/upload', {
          method: 'post',
          body: formData,
        })
        this.message = "File has been uploaded";
        this.error = false;
        this.files = '';
        // await axios.post('/upload', formData)
      } catch(err) {
        // eslint-disable-next-line
        console.log(err)
        this.error = true;
      }
    }
  },

  // props: {
  //   msg: String
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
