<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">Tambah Koleksi</h1>
      <el-form
        :model="form"
        :rules="rules"
        ref="collectionForm"
        label-width="120px"
        enctype="multipart/form-data"
        @submit.prevent="submitForm"
      >
        <el-form-item label="Judul" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Pembuat" prop="creator">
          <el-input v-model="form.creator"></el-input>
        </el-form-item>
        <el-form-item label="Tanggal" prop="date">
          <el-date-picker v-model="form.date" type="date" placeholder="Pilih tanggal"></el-date-picker>
        </el-form-item>
        <el-form-item label="Deskripsi" prop="description">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Gambar" prop="inputFile">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture-card"
          >
            <input type="file" @change="handleFileChange" ref="fileInput" style="display: none">
            <i class="el-icon-plus" @click="$refs.fileInput.click()"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain native-type="submit">Tambah</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElButton, ElDatePicker, ElForm, ElFormItem, ElInput, ElMessage, ElUpload } from 'element-plus';
import { mapActions } from 'vuex';

export default {
  components: {
    ElButton,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElInput,
    ElUpload,
  },
  data() {
    return {
      form: {
        title: '',
        creator: '',
        date: '',
        description: '',
        inputFile: null,
      },
      rules: {
        title: [{ required: true, message: 'Judul diperlukan', trigger: 'blur' }],
        creator: [{ required: true, message: 'Pembuat diperlukan', trigger: 'blur' }],
        date: [{ required: true, message: 'Tanggal diperlukan', trigger: 'blur' }],
        description: [{ required: true, message: 'Deskripsi diperlukan', trigger: 'blur' }],
        inputFile: [{ required: true, message: 'Gambar diperlukan', trigger: 'blur' }],
      },
    };
  },
  methods: {
    ...mapActions('collections', ['createCollections']),
    // Metode untuk menangani perubahan pada file input
    handleFileChange(event) {
      const fileInput = event.target.files[0];
      if (!fileInput) return; // Add null check here
      if (fileInput) {
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(fileInput.type)) {
          this.$message.error(
            "Invalid file type. Please upload a valid image file."
          );
          return;
        }

        const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
        if (fileInput.size > maxSize) {
          this.$message.error(
            "File size exceeds the limit. Please upload a file less than 5 MB."
          );
          return;
        }

        // Set file object to form
        this.form.inputFile = fileInput;
      } else {
        this.form.inputFile = null;
      }
    },

    // Metode untuk mengirim formulir
    async submitForm() {
      try {
        await this.$refs.collectionForm.validate();
        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('creator', this.form.creator);
        formData.append('date', this.form.date);
        formData.append('description', this.form.description);
        formData.append('inputFile', this.form.inputFile[0]); // Append the first file in the array
        await this.createCollections(formData);
        this.$refs.collectionForm.resetFields();
        this.$message.success('Collection created successfully!');
      } catch (error) {
        console.error('Error creating Collection:', error);
        this.$message.error('Failed to create Collection: ' + error.message);
      }
    },

    // Metode untuk menangani keberhasilan unggah
    handleUploadSuccess(response, file, fileList) {
      console.log('Upload berhasil:', response, file, fileList);
    },
    // Metode untuk menangani penghapusan file
    handleRemove(file, fileList) {
      console.log('File dihapus:', file, fileList);
    },
    resetForm() {
      this.form.title = '';
      this.form.creator = '';
      this.form.date = '';
      this.form.description = '';
      this.form.inputFile = null;
    },
  },
};
</script>

