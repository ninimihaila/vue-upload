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
            multiple
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

        </label>
      </div>

    </div>

    <div class="field">
      <div class="level" v-for="(file, index) in selectedFiles"
        :key="index"
        :class="`level ${file.invalidMessage && 'has-text-danger'}`">
        <div class="level-left">
          <div class="level-item">
            {{file.name}}
            <span v-if="file.invalidMessage">&nbsp;- {{file.invalidMessage}}</span>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a class="delete" @click.prevent="removeFileAt(index)"></a>
          </div>
        </div>
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
import axios from 'axios';

export default {
  name: "Upload",

  data() {
    return {
      selectedFiles: [],
      files: [],
      message: "",
      error: false,
    }
  },

  methods: {
    selectFiles() {
      const files = this.$refs.files.files;

      this.files = [...this.files, ...files]

      this.selectedFiles = [
        ...this.selectedFiles,
        ...Array.from(files).map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            invalidMessage: this.validate(file)
        }))
      ];
    },

    validate(file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const MAX_SIZE = 2000000;
      const tooLarge = file.size > MAX_SIZE;

      if (allowedTypes.includes(file.type) && !tooLarge) {
        return "";
      } else {
        return tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}KB` : "Only images are allowed";
      }
    },

    removeFileAt(index) {
      this.files.splice(index, 1)
      this.selectedFiles.splice(index, 1)
    },

    async sendFile() {
      const formData = new FormData();

      for (let file of this.files) {
        if (!this.validate(file)) {
          formData.append('files', file);
          console.log('validated')
        } else {
          console.log('bad')
        }
      }

      try {
        // await fetch('/upload', {
        //   method: 'post',
        //   body: formData,
        // })

        await axios.post('/upload', formData)

        this.message = "File has been uploaded";
        this.error = false;
        this.files = [];
        this.selectedFiles = [];
      } catch(err) {
        // eslint-disable-next-line
        console.log(err)
        this.message = err.response.data.error;
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
