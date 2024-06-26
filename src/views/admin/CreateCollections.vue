<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">Add Colection</h1>
      <el-form :model="form" :rules="rules" ref="collectionForm" label-width="120px"
        @submit.prevent="submitForm">
        <el-form-item label="Title" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Creator" prop="creator">
          <el-input v-model="form.creator"></el-input>
        </el-form-item>
        <el-form-item label="Date release" prop="date">
          <el-date-picker v-model="form.date" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
            placeholder="Choose date"></el-date-picker>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <label
          for="dropzone-file"
          class="mb-5 mx-20 cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
            Collection Image
          </h2>

          <p class="mt-2 text-gray-500 tracking-wide">
            Upload or drag & drop your file PNG, JPG or JPEG.
          </p>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            ref="fileInput"
            @change="handleFileUpload"
            :rules="[
              {
                required: true,
                message: 'Please upload an image file',
                trigger: 'change',
              },
              {
                validator: this.validateFile,
                trigger: 'change',
              },
            ]"
          />
          <!-- Pratinjau (preview) file -->
          <div v-if="form.inputFile" class="mt-4">
            <strong>File Preview:</strong>
            <img
              v-if="isImageFile(form.inputFile)"
              :src="filePreview"
              alt="File Preview"
              class="mt-2 max-w-full"
            />
            <span v-else>{{ form.inputFile.name }}</span>

            <!-- Tombol hapus -->
            <button
              type="button"
              class="mt-2 text-red-600 cursor-pointer"
              @click="deleteFile"
            >
              Delete
            </button>
          </div>
        </label>

        <el-form-item>
          <el-button type="primary" plain :loading="isLoading" native-type="submit">
            Submit
          </el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { ElButton, ElDatePicker, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';
import { mapActions } from 'vuex';

export default {
  components: {
    ElButton,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElInput
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
        address: [{ required: true, message: 'Alamat diperlukan', trigger: 'blur' }],
        inputFile: [{ required: true, message: 'Gambar diperlukan', trigger: 'blur' }],
      },
      isLoading: false,
      filePreview: null
    };
  },
  methods: {
    ...mapActions('collections', ['createCollections']),
    validateFile(rule, value, callback) {
      if (!value) {
        callback(new Error("Please upload an image file"));
      } else {
        const isImage = this.isImageFile(value);
        const isLt2M = value.size / 1024 / 1024 < 2;

        if (!isImage) {
          callback(
            new Error(
              "Invalid image file type. Please upload a valid image file."
            )
          );
        } else if (!isLt2M) {
          callback(new Error("Image size must be less than 2MB"));
        } else {
          callback();
        }
      }
    },
    handleFileUpload(event) {
      const fileInput = event.target.files[0];
      if (!fileInput) return; // Tambahkan pengecekan null di sini
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

        const imageUrl = URL.createObjectURL(fileInput);
        this.filePreview = imageUrl;

        // Set file object to form
        this.form.inputFile = fileInput;
      } else {
        this.filePreview = null;
        this.form.inputFile = null;
      }
    },

    isImageFile(file) {
      return file.type.startsWith("image/");
    },

    deleteFile() {
      // Hapus pratinjau dan reset nilai file input
      this.filePreview = null;
      this.form.inputFile = null;
    },


    async submitForm() {
      try {
        this.isLoading = true;
        await this.$refs.collectionForm.validate();
        
        // Pastikan properti inputFile tidak kosong sebelum mengirimkan formulir
        if (!this.form.inputFile) {
          ElMessage.error("File belum dipilih.");
          return;
        }

        const formData = new FormData();

        // Menambahkan file sebagai bagian dari formData
        formData.append('inputFile', this.form.inputFile);

        // Menambahkan sisa data form ke formData
        Object.keys(this.form).forEach((key) => {
          if (key !== "inputFile") {
            formData.append(key, this.form[key]);
          }
        });

       await this.createCollections(formData);

        ElMessage.success('Koleksi berhasil ditambahkan');
        this.$router.push({ name: "CollectionAdmin" });
        this.$refs.collectionForm.resetFields();
      } catch (error) {
        console.error('Error creating Collection:', error);
        ElMessage.error('Gagal menambahkan koleksi');
      } finally {
        this.isLoading = false;
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

